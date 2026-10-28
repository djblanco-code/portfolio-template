import Link from "next/link";
import { formatPostDate, type PostMeta } from "@/lib/posts";

export function PostByline({ post }: { post: PostMeta }) {
  return (
    <p className="text-sm text-neutral-500 dark:text-neutral-400">
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true"> · </span>
      {post.readingMinutes} min read
    </p>
  );
}

export function PostTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="divide-y divide-neutral-300 border-y border-neutral-300 dark:divide-neutral-800 dark:border-neutral-800">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="group flex gap-6 py-8">
            <div className="min-w-0 flex-1">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden="true"> · </span>
                {post.readingMinutes} min read
              </p>
              <h2 className="font-display text-3xl leading-tight text-neutral-900 decoration-1 underline-offset-4 group-hover:underline dark:text-white md:text-4xl">
                {post.title}
              </h2>
              {post.excerpt ? (
                <p className="mt-3 line-clamp-2 font-serif text-lg text-neutral-600 dark:text-neutral-400">
                  {post.excerpt}
                </p>
              ) : null}
              {post.tags.length > 0 ? (
                <p className="mt-4 text-sm text-neutral-500">{post.tags.join(" · ")}</p>
              ) : null}
            </div>
            {post.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImage}
                alt=""
                className="hidden aspect-[4/3] w-44 shrink-0 self-center rounded-sm object-cover sm:block"
              />
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
