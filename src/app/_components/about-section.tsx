'use client';

import AnimatedSection from './animated-section';
import SectionHeader from './section-header';
import { JOURNEY, SITE } from '@/lib/site-content';

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp">
          <SectionHeader
            label="Journey"
            title={SITE.journeyTitle}
          />
        </AnimatedSection>

        <ol className="divide-y divide-neutral-300 border-y border-neutral-300 dark:divide-neutral-800 dark:border-neutral-800">
          {JOURNEY.map((milestone, index) => (
            <li key={milestone.title}>
              <AnimatedSection animation="slideUp" delay={index * 80}>
                <div className="group grid gap-3 py-8 md:grid-cols-[10rem_1fr_1.2fr] md:gap-8">
                  <p className="text-sm font-medium tabular-nums text-neutral-500 md:pt-1">{milestone.when}</p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 font-display text-xl italic text-neutral-600 dark:text-neutral-400">
                      {milestone.where}
                    </p>
                  </div>
                  <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">{milestone.description}</p>
                </div>
              </AnimatedSection>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default AboutSection;
