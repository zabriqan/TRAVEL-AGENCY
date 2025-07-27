'use client';
import logo from '@/public/logo.png'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
// import logo from '@/public/logo.png';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useNavStore } from '@/lib/store/navstore';
import { X } from 'lucide-react';


export default function Navbar() {
  const pathname = usePathname();
  const setActiveTab = useNavStore((state) => state.setActiveTab);
  const activeTab = useNavStore((state) => state.activeTab);

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }})


  // ✅ Sync activeTab with route
  useEffect(() => {
    const syncTab = () => {
      if (pathname === '/contact') {
        setActiveTab('contact');
      } ;
        if (pathname === '/about') {
          setActiveTab('about');

        }if (pathname.startsWith ('/destinations')) {
          setActiveTab('destinations');

        }if (pathname === '/tours') {
          setActiveTab('tours');

        }else if (pathname === '/') {
        const hash = window.location.hash
           if (hash === '#skardu') {
          setActiveTab('destinations');
        } else {
          setActiveTab('home');
        }
      }
    };

    syncTab();

    // also re-run on hashchange (e.g. clicking #about links)
    window.addEventListener('hashchange', syncTab);
    return () => window.removeEventListener('hashchange', syncTab);
  }, [pathname, setActiveTab]);
  const navItems = [
    { label: 'Home', href: '/', tab: 'home' },
    { label: 'About', href: '/about', tab: 'about' },
    { label: 'Destinations', href: '/destinations', tab: 'destinations' },
    { label: 'Tours', href: '/tours', tab: 'tours' },
  ];

  return (
    <nav className="w-full sticky top-0 z-40 bg-white">
      <div className="w-80 md:w-4xl lg:w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image src={logo} alt="Logo"  className="w-50 md:w-80 h-auto" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 ml-10 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.tab}
              href={item.href}
              onClick={() => setActiveTab(item.tab)}
              className={`transition-opacity duration-300 text-[20px] font-medium hover:text-secondary hover:opacity-100 ${activeTab === item.tab
                  ? 'text-secondary opacity-100'
                  : 'text-secondary opacity-50'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Contact Button */}
        <div className="hidden md:block">
          <Link key='contact'
            onClick={() => setActiveTab('contact')}
            href="/contact"
            className={`  text-white bg-secondary-light font-bold text-[20px] hover:bg-secondary p-3  rounded-lg transition`}
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
            <Link
              key={item.tab}
              href={item.href!}
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
