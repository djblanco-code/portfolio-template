"use client";

import { memo, useEffect, useState } from "react";

declare global {
  var updateDOM: () => void;
}

type ColorSchemePreference = "system" | "dark" | "light";

const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes: ColorSchemePreference[] = ["system", "dark", "light"];

/** to reuse updateDOM function defined inside injected script */

/** function to be injected in script tag for avoiding FOUC (Flash of Unstyled Content) */
export const NoFOUCScript = (storageKey: string) => {
  /* can not use outside constants or function as this script will be injected in a different context */
  const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];

  /** Modify transition globally to avoid patched transitions */
  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);

    return () => {
      /* Force restyle */
      getComputedStyle(document.body);
      /* Wait for next tick before removing */
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

  /** function to add remove dark class */
  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    const systemMode = media.matches ? DARK : LIGHT;
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const classList = document.documentElement.classList;
    if (resolvedMode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute("data-mode", mode);
    restoreTransitions();
  };
  window.updateDOM();
  media.addEventListener("change", window.updateDOM);
};

type ThemeOption = { mode: ColorSchemePreference; label: string; icon: string };

// Same order as Profound's appearance toggle: light, dark, then follow the device.
const options: ThemeOption[] = [
  { mode: "light", label: "Light theme", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" },
  { mode: "dark", label: "Dark theme", icon: "M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z" },
  { mode: "system", label: "Match device theme", icon: "M9.75 17 9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" },
];

/** Light / dark / system segmented control. */
export const ThemeToggle = ({ className = "" }: { className?: string }) => {
  // Start from "system" so server and client render the same markup, then read the saved choice.
  const [mode, setMode] = useState<ColorSchemePreference>("system");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ColorSchemePreference | null;
    if (saved && modes.includes(saved)) setMode(saved);
    /** Sync the tabs */
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) setMode(e.newValue as ColorSchemePreference);
    };
    addEventListener("storage", onStorage);
    return () => removeEventListener("storage", onStorage);
  }, []);

  const choose = (next: ColorSchemePreference) => {
    setMode(next);
    localStorage.setItem(STORAGE_KEY, next);
    window.updateDOM?.();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={`inline-flex items-center gap-0.5 rounded-full border border-neutral-300 p-0.5 dark:border-neutral-700 ${className}`}
    >
      {options.map((option) => {
        const selected = mode === option.mode;
        return (
          <button
            key={option.mode}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            title={option.label}
            onClick={() => choose(option.mode)}
            className={`rounded-full p-1.5 transition-colors ${
              selected
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

/** Applies the saved theme before the page paints, so there's no flash of the wrong theme. */
export const ThemeScript = memo(() => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
    }}
  />
));
ThemeScript.displayName = "ThemeScript";
