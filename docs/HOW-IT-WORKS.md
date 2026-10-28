# How it works

This page explains what's going on under the hood: what each piece does, how they connect, and why it's built this way instead of another way. You don't need any of this to use the site, but it helps when something breaks, and it's useful if you ever need to explain your setup.

## The short version

The site is built with **Next.js** and hosted on **Vercel**. Blog posts are written in **Keystatic**, which saves each post as a Markdown file in your GitHub repository. Every change to the repository triggers Vercel to rebuild the site, and the pages are generated ahead of time, so visitors get plain, fast pages.

## The pieces

| Piece | What it does |
|---|---|
| **GitHub** | Stores every file: code, settings, posts, and images. It also keeps the full history of every change. |
| **Next.js** | The framework that turns the code and your posts into web pages. |
| **Vercel** | Builds the site whenever the repository changes, and serves it to visitors from servers around the world. |
| **Keystatic** | The writing editor at `/keystatic`. It reads and writes the Markdown files in `_posts/`. |
| **Tailwind CSS** | Handles the styling (colors, spacing, fonts) directly in the page code. |

## What happens when you publish a post

1. You write a post in the editor at `/keystatic` and click **Save**.
2. Keystatic uses your GitHub App's permission to save the post into your repository as a file, like `_posts/my-first-post.md`.
3. GitHub tells Vercel the repository changed.
4. Vercel rebuilds the site. Each post becomes its own page, and your RSS feed and sitemap are regenerated.
5. About a minute later, the new version is live.

The same thing happens when you edit `site-content.ts` on GitHub. The editor is just a friendlier way to make those changes.

## Where things live

```
_posts/                     Your blog posts, one Markdown file each
public/                     Images: your photo, post images, and the site icon
src/lib/site-content.ts     Your name, links, projects, and timeline
src/app/(site)/             The pages people visit: home, /blog, and each post
src/app/_components/        The building blocks of the home page (hero, projects, footer, and so on)
src/app/keystatic/          The editor's page
src/app/api/keystatic/      The small piece of server code the editor uses to talk to GitHub
keystatic.config.ts         What fields a post has (title, excerpt, date, tags, and so on)
```

## Why it's built this way

The big decision here is storing content as **files in the repository** (often called a "Git-based CMS") instead of in a **database**.

### What you get

- **No database or server to manage.** There's nothing to keep running, patch, or pay for. Fewer moving parts means fewer things that can break.
- **Free and fast.** Personal sites fit in Vercel's free tier. Pages are generated ahead of time, so they load quickly.
- **Version history for free.** Every edit is saved as a change in GitHub, so you can see what changed and when, and undo anything.
- **Your content is portable.** Posts are plain Markdown files. If you ever leave this setup, you take them with you; nothing is locked inside a platform.

### What you give up

- **Publishing isn't instant.** Each change needs a rebuild, which takes about a minute.
- **It's tied to GitHub.** Anyone who writes for the site needs access to the repository. That's fine for one person, but awkward for a team of non-technical writers.
- **Dynamic features take extra work.** Comments, likes, view counts, or search need a separate service, because there's no database.
- **Builds get slower as the site grows.** With hundreds of posts, each rebuild takes longer. For a personal site, this takes a long time to matter.

### When I'd choose differently

For a personal site, those tradeoffs are worth it. If I were building something with many writers, content that changes every few seconds, or lots of reader activity (accounts, comments, likes), I'd use a database and a hosted CMS instead.

## Adding things later

| If you want… | A good fit |
|---|---|
| Email subscribers | Buttondown (see Step 7 in the README). No database needed. |
| Comments | Giscus, which stores comments in GitHub Discussions (readers need a GitHub account), or Supabase for comments from anyone. |
| Likes or view counts | Upstash Redis, which you can add from Vercel's Marketplace. |
| Analytics | Vercel Web Analytics, turned on from your project's **Analytics** tab. |

## One detail worth knowing

Locally (when a developer runs `npm run dev` on their computer), the editor saves posts straight to the `_posts/` folder on that computer instead of going through GitHub. On Vercel it always goes through GitHub. This is set in `keystatic.config.ts`.

Until the GitHub App keys are added in Vercel, the rest of the site works normally and only `/keystatic` shows a "not set up yet" message. This is deliberate: a missing key shouldn't take down the whole site.
