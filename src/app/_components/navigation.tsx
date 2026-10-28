'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-switcher';
import { SITE } from '@/lib/site-content';

type NavItem = { label: string } & ({ section: string } | { href: string });

const navItems: NavItem[] = [
  { section: 'projects', label: 'Projects' },
  { href: '/blog', label: 'Writing' },
  { section: 'about', label: 'Journey' },
  { section: 'contact', label: 'Contact' },
];

const Navigation = () => {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
      const sections = ['home', 'projects', 'about', 'contact'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const isActive = (item: NavItem) =>
    'href' in item ? pathname.startsWith(item.href) : onHome && activeSection === item.section;

  const itemClass = (item: NavItem) =>
    `rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
      isActive(item)
        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
        : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
    }`;

  // Section links scroll in place on the home page and navigate to /#section elsewhere.
  const renderItem = (item: NavItem, className: string) => {
    if ('href' in item) {
      return (
        <Link key={item.label} href={item.href} className={className}>
          {item.label}
        </Link>
      );
    }
    if (!onHome) {
      return (
        <Link key={item.label} href={`/#${item.section}`} className={className}>
          {item.label}
        </Link>
      );
    }
    return (
      <button key={item.label} onClick={() => scrollToSection(item.section)} className={className}>
        {item.label}
      </button>
    );
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        menuOpen
          ? 'border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950'
          : isScrolled
          ? 'border-b border-neutral-200 bg-neutral-50/85 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/85'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-lg font-bold tracking-tight text-neutral-900 transition-colors duration-200 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300">
              {SITE.firstName} <span className="font-display text-xl font-normal italic">{SITE.lastName}</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => renderItem(item, itemClass(item)))}
            </div>

            <ThemeToggle />

            <div className="flex md:hidden">
              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="text-neutral-600 hover:text-neutral-900 focus:text-neutral-900 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus:text-neutral-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={menuOpen ? 'M6 18 18 6M6 6l12 12' : 'M4 8h16M4 16h16'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {menuOpen ? (
          <div className="flex flex-col border-t border-neutral-200 py-4 dark:border-neutral-800 md:hidden">
            {navItems.map((item) =>
              renderItem(
                item,
                'py-2 text-left font-display text-4xl text-neutral-900 transition-colors hover:text-neutral-500 dark:text-white dark:hover:text-neutral-400',
              ),
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navigation;
