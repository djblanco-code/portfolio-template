import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

/** Posts are Markdown files in _posts/, written by hand or through the Keystatic editor at /keystatic. */
const POSTS_DIR = path.join(process.cwd(), "_posts");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  tags: string[];
  coverImage: string | null;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

// YAML parses an unquoted 2024-01-15 into a Date, so accept both forms.
function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  return "1970-01-01";
}

function readPostFile(slug: string) {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(file);
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: toIsoDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: typeof data.coverImage === "string" && data.coverImage ? data.coverImage : null,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
  return { meta, content, draft: data.draft === true };
}

function postSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

/** Published posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return postSlugs()
    .map(readPostFile)
    .filter((post) => !post.draft)
    .map((post) => post.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!postSlugs().includes(slug)) return null;
  const { meta, content, draft } = readPostFile(slug);
  if (draft) return null;
  // Raw HTML in posts is dropped rather than passed through.
  const html = String(
    await remark().use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(content),
  );
  return { ...meta, html };
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
