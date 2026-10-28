import Link from 'next/link';
import AnimatedSection from './animated-section';
import SectionHeader from './section-header';
import { ArrowRight } from './icons';
import { formatPostDate, type PostMeta } from '@/lib/posts';

const WritingSection = ({ posts }: { posts: PostMeta[] }) => {
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp">
          <SectionHeader
            label="Writing"
            title="Recent writing"
            aside={
              <Link href="/blog" className="inline-flex items-center gap-2 font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-white">
                All writing <ArrowRight />
              </Link>
            }
          />
        </AnimatedSection>

        <ul className="divide-y divide-neutral-300 border-y border-neutral-300 dark:divide-neutral-800 dark:border-neutral-800">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <AnimatedSection animation="slideUp" delay={index * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-2 py-7 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8"
                >
                  <time dateTime={post.date} className="text-sm tabular-nums text-neutral-500">
                    {formatPostDate(post.date)}
                  </time>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-white">
                      {post.title}
                    </h3>
                    {post.excerpt ? (
                      <p className="mt-2 line-clamp-2 text-neutral-600 dark:text-neutral-400">{post.excerpt}</p>
                    ) : null}
                  </div>
                  <span className="text-sm text-neutral-500">{post.readingMinutes} min read</span>
                </Link>
              </AnimatedSection>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WritingSection;
