import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";
import { ArrowRight } from "@/app/_components/icons";
import { PostByline, PostTags } from "../_components/post-list";
import ReadingProgress from "../_components/reading-progress";
import ShareBar from "../_components/share-bar";
import SubscribeBox from "../_components/subscribe-box";
import { FULL_NAME, SITE, SITE_URL } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

// Only posts that exist at build time get pages; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const images = [post.coverImage ?? SITE.photo];
  return {
    title: `${post.title} | ${FULL_NAME}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [FULL_NAME],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const morePosts = getAllPosts()
    .filter((other) => other.slug !== post.slug)
    .slice(0, 2);

  return (
    <main className="mx-auto max-w-[700px] px-4 pb-16 pt-28 sm:px-6 md:pt-32">
      <ReadingProgress />
      <article>
        <header className="mb-10">
          <Link
            href="/blog"
            className="mb-8 inline-block text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            ← Writing
          </Link>
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-neutral-900 dark:text-white md:text-6xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-5 font-serif text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-8 flex items-center gap-3 border-y border-neutral-300 py-4 dark:border-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.photo} alt="" className="h-11 w-11 rounded-full object-cover" />
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">{FULL_NAME}</p>
              <PostByline post={post} />
            </div>
          </div>
        </header>

        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt="" className="mb-10 w-full rounded-sm" />
        ) : null}

        <div
          className="prose prose-lg prose-neutral max-w-none font-serif dark:prose-invert prose-headings:font-sans prose-headings:tracking-tight prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none prose-blockquote:font-display prose-blockquote:text-2xl prose-blockquote:font-normal prose-img:rounded-sm"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="mt-14 space-y-8">
          <PostTags tags={post.tags} />
          <div className="border-y border-neutral-300 py-5 dark:border-neutral-800">
            <ShareBar url={`${SITE_URL}/blog/${post.slug}`} title={post.title} />
          </div>
          {/* Comments (e.g. Giscus) would go here, below the share bar. */}
          <div className="flex gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.photo} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
            <div className="self-center text-sm leading-relaxed">
              <Link href="/" className="font-semibold text-neutral-900 underline underline-offset-4 dark:text-white">
                {FULL_NAME}
              </Link>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                {SITE.role}
              </p>
            </div>
          </div>
        </footer>
      </article>

      {morePosts.length > 0 ? (
        <section className="mt-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">More writing</p>
          <ul className="divide-y divide-neutral-300 border-y border-neutral-300 dark:divide-neutral-800 dark:border-neutral-800">
            {morePosts.map((other) => (
              <li key={other.slug}>
                <Link href={`/blog/${other.slug}`} className="group flex items-center justify-between gap-4 py-5">
                  <span className="font-display text-2xl text-neutral-900 group-hover:underline group-hover:underline-offset-4 dark:text-white">
                    {other.title}
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-neutral-500" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <SubscribeBox className="mt-16" />
    </main>
  );
}
