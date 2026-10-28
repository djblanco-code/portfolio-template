"use client";

import { useEffect, useState } from "react";
import { LinkIcon, LinkedInIcon, ShareIcon, XIcon } from "@/app/_components/icons";

const buttonClass =
  "inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-300 dark:hover:text-white";

export default function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  // navigator.share only exists in the browser (mostly on phones), so check after mount.
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Share</span>
      {canShare ? (
        <button type="button" className={buttonClass} onClick={() => navigator.share({ title, url }).catch(() => {})}>
          <ShareIcon /> Share
        </button>
      ) : null}
      <button type="button" className={buttonClass} onClick={copyLink}>
        <LinkIcon /> <span aria-live="polite">{copied ? "Copied!" : "Copy link"}</span>
      </button>
      <a
        className={buttonClass}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon className="h-4 w-4" /> LinkedIn
      </a>
      <a
        className={buttonClass}
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
      >
        <XIcon /> Post
      </a>
    </div>
  );
}
