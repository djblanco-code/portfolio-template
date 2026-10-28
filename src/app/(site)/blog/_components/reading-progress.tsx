"use client";

import { useEffect, useState } from "react";

/** Thin bar under the nav that fills as you scroll through the post. */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-16 z-40 h-0.5" aria-hidden="true">
      <div
        className="h-full origin-left bg-neutral-900 dark:bg-white"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
