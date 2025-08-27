'use client';
import logo from '@/public/images/logo.png'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useNavStore } from '@/app/lib/store/navstore';
import { X, ChevronDown, MenuIcon } from 'lucide-react';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';

export default function Navbar() {
  const pathname = usePathname();
  const setActiveTab = useNavStore((state) => state.setActiveTab);
  const activeTab = useNavStore((state) => state.activeTab);

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  // ✅ Sync activeTab with route
  useEffect(() => {
    const syncTab = () => {
      if (pathname === '/contact') {
        setActiveTab('contact');
      }
      if (pathname === '/about') {
        setActiveTab('about');
      }
      if (pathname.startsWith('/destinations')) {
        setActiveTab('destinations');
      }
      if (pathname.startsWith('/tours')) {
        setActiveTab('tours');
      } else if (pathname === '/') {
        const hash = window.location.hash;
        if (hash === '#skardu') {
          setActiveTab('destinations');
        } else {
          setActiveTab('home');
        }
      }
    };

    syncTab();
    window.addEventListener('hashchange', syncTab);
    return () => window.removeEventListener('hashchange', syncTab);
  }, [pathname, setActiveTab]);

  const navItems = [
    { label: 'Home', href: '/', tab: 'home' },
    { label: 'About', href: '/about', tab: 'about' },
    { label: 'Destinations', href: '/destinations', tab: 'destinations' },
    {
      label: 'Tours',
      href: '/tours',
      tab: 'tours',
      children: [
        { label: 'Domestic', href: '/tours?type=domestic', tab: 'tours-national' },
        { label: 'International', href: '/tours?type=international', tab: 'tours-international' },
        { label: 'Umrah', href: '/tours?type=umrah', tab: 'tours-umrah' },
        { label: 'View All', href: '/tours', tab: 'tours' }
      ]
    },
  ];

  return (
    <nav className='fixed top-0 z-50 flex p-2 lg:py-3 lg:px-6 items-center justify-between w-screen'>
      <div className="bg-white shadow-lg rounded-full px-5.5 h-11 lg:h-14 grid place-items-center">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-40 lg:w-[13rem] h-auto" />
        </Link>
      </div>
      <div className="px-6 h-14 bg-white shadow-lg rounded-full hidden lg:flex items-center gap-8 text-lg absolute left-1/2 -translate-x-1/2">
        {navItems.map((item) =>
          item.children ? (
            // Tours Dropdown
            <Menu as="div" key={item.tab} className="relative">
              <Menu.Button
                className={`flex cursor-pointer items-center gap-1 transition font-medium hover:text-secondary hover:opacity-100 ${activeTab === item.tab
                  ? 'text-secondary opacity-100'
                  : 'text-secondary opacity-50'
                  }`}
              >
                {item.label}
                <ChevronDown size={18} className='mt-1.5' />
              </Menu.Button>
              <Menu.Items className="absolute mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg focus:outline-none">
                {item.children.map((child) => (
                  <Menu.Item key={child.tab}>
                    {({ active }) => (
                      <Link
                        href={child.href}
                        onClick={() => setActiveTab('tours')}
                        className={clsx(
                          "block px-4 py-2 text-sm rounded text-secondary opacity-50 hover:text-secondary-dark hover:opacity-100",
                          active && 'text-secondary-dark font-semibold'

                        )}
                      >
                        {child.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          ) : (
            <Link
              key={item.tab}
              href={item.href}
              onClick={() => setActiveTab(item.tab)}
              className={`transition font-medium hover:text-secondary hover:opacity-100 ${activeTab === item.tab
                ? 'text-secondary opacity-100'
                : 'text-secondary opacity-50'
                }`}
            >
              {item.label}
            </Link>
          )
        )}
      </div>
      <Link href="/contact" onClick={() => setActiveTab('contact')} className={`transition font-medium bg-primary hover:bg-primary-dark px-6 text-lg h-14 hidden lg:flex items-center rounded-full text-white shadow-lg`}>
        Contact Us
      </Link>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="transition font-medium bg-white h-11 w-11 grid place-items-center lg:hidden rounded-full text-gray-800 shadow-lg"
      >
        <MenuIcon className='w-5' />
      </button>
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-6 px-4">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 left-4 text-secondary hover:text-secondary-dark opacity-70"
          >
            <X size={32} />
          </button>

          {navItems.map((item) => (
            <div key={item.tab} className="w-full text-center">
              {item.children ? (
                <>
                  {/* Toggle Button */}
                  <button
                    onClick={() => setMobileToursOpen((prev) => !prev)}
                    className={`flex items-center justify-center gap-1 w-full text-xl font-semibold ${activeTab === item.tab
                      ? 'text-secondary opacity-100'
                      : 'text-secondary opacity-50'
                      }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={`transition-transform mt-1 ${mobileToursOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {/* Collapsible Sub-links */}
                  {mobileToursOpen && (
                    <div className="mt-2 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.tab}
                          href={child.href}
                          onClick={() => {
                            setActiveTab('tours');
                            setMenuOpen(false);
                          }}
                          className='block text-lg text-secondary opacity-50 hover:text-secondary-dark hover:opacity-100'
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setMenuOpen(false);
                  }}
                  className={`text-xl font-semibold hover:text-secondary hover:opacity-100 ${activeTab === item.tab
                    ? 'text-secondary opacity-100'
                    : 'text-secondary opacity-50'
                    }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <Link
            href="/contact"
            onClick={() => {
              setActiveTab('contact');
              setMenuOpen(false);
            }}
            className="text-xl font-semibold text-secondary hover:text-secondary"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
