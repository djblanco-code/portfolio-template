'use client';

import Link from 'next/link';
import AnimatedSection from './animated-section';
import { ArrowRight, GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import { CONTACT_EMAIL, FULL_NAME, PLACES, SITE, SOCIAL_LINKS } from '@/lib/site-content';

const socialIcons: Record<string, typeof LinkedInIcon> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
};

const HomeSection = () => {
  return (
    <section id="home" className="pb-20 pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <AnimatedSection animation="fadeIn">
              <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                {SITE.role}
              </p>
              <h1 className="text-[clamp(3.25rem,13vw,9rem)] leading-[0.85] tracking-tight text-neutral-900 dark:text-white">
                <span className="block font-bold tracking-[-0.04em]">{SITE.firstName}</span>
                <span className="block font-display italic">{SITE.lastName}</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="slideUp" delay={150} className="mt-10 max-w-xl">
              <p className="font-display text-3xl leading-tight text-neutral-800 dark:text-neutral-100 md:text-4xl">
                {SITE.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  Get in touch <ArrowRight />
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-300"
                >
                  Read my writing
                </Link>
                <div className="ml-1 flex items-center gap-1">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    aria-label="Email"
                    className="rounded-full p-2.5 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    <MailIcon />
                  </a>
                  {SOCIAL_LINKS.map(({ label, href }) => {
                    const Icon = socialIcons[label];
                    return Icon ? (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="rounded-full p-2.5 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                      >
                        <Icon />
                      </a>
                    ) : null;
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="slideUp" delay={300} className="w-56 sm:w-64 lg:w-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE.photo}
              alt={FULL_NAME}
              className="aspect-[4/5] w-full rounded-sm object-cover grayscale transition duration-500 hover:grayscale-0"
              style={{ objectPosition: 'center 30%' }}
            />
          </AnimatedSection>
        </div>

        <AnimatedSection
          animation="fadeIn"
          delay={450}
          className="mt-16 flex flex-col gap-3 border-t border-neutral-300 pt-6 dark:border-neutral-800 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <p className="shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Previously &amp; currently
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-medium text-neutral-500 dark:text-neutral-400">
            {PLACES.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HomeSection;
