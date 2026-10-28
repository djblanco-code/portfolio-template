import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList from "./_components/post-list";
import SubscribeBox, { SUBSCRIBE_ANCHOR } from "./_components/subscribe-box";
import { FULL_NAME } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Writing | ${FULL_NAME}`,
  description: `Writing by ${FULL_NAME}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6 md:pt-36">
      <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            By {FULL_NAME}
          </p>
          <h1 className="font-display text-6xl leading-none tracking-tight text-neutral-900 dark:text-white md:text-7xl">
            Writing
          </h1>
          <p className="mt-4 max-w-md text-neutral-600 dark:text-neutral-400">
            Notes, essays, and things I&apos;ve learned along the way.
          </p>
        </div>
        <a
          href={`#${SUBSCRIBE_ANCHOR}`}
          className="self-start rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 sm:self-auto"
        >
          Subscribe
        </a>
      </header>

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div className="border-y border-neutral-300 py-16 text-center dark:border-neutral-800">
          <p className="font-display text-3xl text-neutral-900 dark:text-white">The first post is on its way.</p>
          <p className="mt-2 text-neutral-500">Subscribe below to hear when it&apos;s out.</p>
        </div>
      )}

      <SubscribeBox className="mt-16" />
    </main>
  );
}
