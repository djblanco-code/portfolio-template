import type { ReactNode } from 'react';

/** Small label above a large heading, used by every home page section. */
const SectionHeader = ({
  label,
  title,
  aside,
}: {
  label: string;
  title: ReactNode;
  aside?: ReactNode;
}) => (
  <div className="mb-12 flex flex-col gap-6 border-t border-neutral-300 pt-6 dark:border-neutral-800 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>
      <h2 className="font-display text-5xl leading-none tracking-tight text-neutral-900 dark:text-white md:text-6xl">
        {title}
      </h2>
    </div>
    {aside ? <div className="text-sm text-neutral-600 dark:text-neutral-400 md:max-w-xs md:text-right">{aside}</div> : null}
  </div>
);

export default SectionHeader;
