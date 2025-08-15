'use client';
import logo from '@/public/images/logo.png'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useNavStore } from '@/app/lib/store/navstore';
import { X, ChevronDown } from 'lucide-react';
import { Menu } from '@headlessui/react';

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
    <nav className="w-full sticky top-0 z-40 bg-white">
      <div className="w-80 md:w-4xl lg:w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image src={logo} alt="Logo" className="w-50 md:w-80 h-auto" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 ml-10 flex-1">
          {navItems.map((item) =>
            item.children ? (
              // Tours Dropdown
              <Menu as="div" key={item.tab} className="relative">
                <Menu.Button
                  className={`flex items-center gap-1 transition-opacity duration-300 text-[20px] font-medium hover:text-secondary hover:opacity-100 ${
                    activeTab === item.tab
                      ? 'text-secondary opacity-100'
                      : 'text-secondary opacity-50'
                  }`}
                >
                  {item.label}
                  <ChevronDown size={18}  className='mt-1.5'/>
                </Menu.Button>
                <Menu.Items className="absolute mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg focus:outline-none">
                  {item.children.map((child) => (
                    <Menu.Item key={child.tab}>
                      {({ active }) => (
                        <Link
                          href={child.href}
                          onClick={() => setActiveTab('tours')}
                          className={`block px-4 py-2 text-sm rounded text-secondary opacity-50 hover:text-secondary-dark hover:opacity-100`}
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
                className={`transition-opacity duration-300 text-[20px] font-medium hover:text-secondary hover:opacity-100 ${
                  activeTab === item.tab
                    ? 'text-secondary opacity-100'
                    : 'text-secondary opacity-50'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Contact Button */}
        <div className="hidden md:block">
          <Link
            key="contact"
            onClick={() => setActiveTab('contact')}
            href="/contact"
            className='text-white bg-secondary-light font-bold text-[20px] hover:bg-secondary p-3 rounded-lg transition'
          >
            Contact
          </Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-secondary-light"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-6 px-4">
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
                    className={`flex items-center justify-center gap-1 w-full text-xl font-semibold ${
                      activeTab === item.tab
                        ? 'text-secondary opacity-100'
                        : 'text-secondary opacity-50'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={`transition-transform mt-1 ${
                        mobileToursOpen ? 'rotate-180' : ''
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
                  className={`text-xl font-semibold hover:text-secondary hover:opacity-100 ${
                    activeTab === item.tab
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
