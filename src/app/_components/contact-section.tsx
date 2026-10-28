'use client';

import { useState } from 'react';
import AnimatedSection from './animated-section';
import SectionHeader from './section-header';
import { ArrowUpRight } from './icons';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/site-content';

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp">
          <SectionHeader
            label="Contact"
            title={
              <>
                Let&apos;s build <span className="italic text-neutral-500">something.</span>
              </>
            }
          />
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={150} className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-8">
          <p className="max-w-sm text-neutral-600 dark:text-neutral-400">
            Whether it&apos;s a project, a role, or just to say hi, my inbox is open.
          </p>

          <div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="break-all text-2xl font-semibold tracking-tight text-neutral-900 underline decoration-neutral-300 decoration-2 underline-offset-[10px] transition-colors hover:decoration-neutral-900 dark:text-white dark:decoration-neutral-700 dark:hover:decoration-white sm:text-3xl md:text-4xl"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                <span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span>
              </button>
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-300"
                >
                  {label} <ArrowUpRight />
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
