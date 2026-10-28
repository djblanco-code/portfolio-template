'use client';

import AnimatedSection from './animated-section';
import SectionHeader from './section-header';
import { ArrowUpRight } from './icons';
import { STATIC_PROJECTS } from '@/lib/site-content';

const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const ProjectsSection = () => {
  const projects = STATIC_PROJECTS;

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp">
          <SectionHeader label="Projects" title="Things I'm building" />
        </AnimatedSection>

        <ul className="divide-y divide-neutral-300 border-y border-neutral-300 dark:divide-neutral-800 dark:border-neutral-800">
          {projects.map((project, index) => {
            const href = project.live_url || project.github_url;
            const row = (
              <div className="grid gap-2 py-7 md:grid-cols-[3rem_1fr_1.4fr_auto] md:items-baseline md:gap-8">
                <span className="text-sm tabular-nums text-neutral-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-white md:text-3xl">
                  {project.title}
                </h3>
                <div>
                  <p className="text-neutral-600 dark:text-neutral-400">{project.description}</p>
                  {project.technologies.length > 0 ? (
                    <p className="mt-2 text-sm text-neutral-500">{project.technologies.join(' · ')}</p>
                  ) : null}
                </div>
                {href ? (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {displayUrl(href)}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                ) : null}
              </div>
            );

            return (
              <li key={project.id}>
                <AnimatedSection animation="slideUp" delay={index * 100}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
                      {row}
                    </a>
                  ) : (
                    row
                  )}
                </AnimatedSection>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ProjectsSection;
