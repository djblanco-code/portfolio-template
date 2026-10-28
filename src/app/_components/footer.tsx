import Link from 'next/link';
import { CONTACT_EMAIL, FULL_NAME, SITE, SOCIAL_LINKS } from '@/lib/site-content';

const siteLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Journey', href: '/#about' },
  { label: 'Writing', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

const elsewhereLinks = [
  ...SOCIAL_LINKS.map((link) => ({ ...link, external: true })),
  { label: 'Email', href: `mailto:${CONTACT_EMAIL}`, external: false },
  { label: 'RSS', href: '/rss.xml', external: false },
];

const linkClass =
  'text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white';

const Footer = () => (
  <footer className="mt-12 border-t border-neutral-300 dark:border-neutral-800">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr] lg:px-8">
      <div>
        <Link href="/" className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
          {SITE.firstName} <span className="font-display text-xl font-normal italic">{SITE.lastName}</span>
        </Link>
        <p className="mt-3 max-w-xs text-sm text-neutral-600 dark:text-neutral-400">
          {SITE.tagline}
        </p>
      </div>

      <nav aria-label="Site">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Site</p>
        <ul className="space-y-2 text-sm">
          {siteLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Elsewhere</p>
        <ul className="space-y-2 text-sm">
          {elsewhereLinks.map(({ label, href, external }) => (
            <li key={label}>
              <a
                href={href}
                className={linkClass}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mx-auto max-w-6xl px-4 pb-10 text-xs text-neutral-500 sm:px-6 lg:px-8">
      © {new Date().getFullYear()} {FULL_NAME}
    </div>
  </footer>
);

export default Footer;
