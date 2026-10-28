import { collection, config, fields } from "@keystatic/core";
import { FULL_NAME, SITE } from "./src/lib/site-content";

// Production (Vercel) edits go through GitHub: saving a post commits it to the
// repo, which triggers a redeploy. Locally, edits write straight to _posts/.
// Set NEXT_PUBLIC_KEYSTATIC_STORAGE=github locally to run the GitHub App setup.
const useGitHub =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

// If githubRepo in site-content.ts still has its placeholder, fall back to the
// repository Vercel built the site from.
const vercelRepo =
  process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER && process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG
    ? `${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`
    : null;
const repo = (
  SITE.githubRepo === "your-username/your-repo" && vercelRepo ? vercelRepo : SITE.githubRepo
) as `${string}/${string}`;

export default config({
  storage: useGitHub ? { kind: "github", repo } : { kind: "local" },
  ui: {
    brand: { name: FULL_NAME },
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "_posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "One or two sentences shown on the blog index and in link previews.",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        date: fields.date({
          label: "Published",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/assets/blog",
          publicPath: "/assets/blog/",
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Drafts are saved but not shown on the site.",
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
          options: {
            image: {
              directory: "public/assets/blog",
              publicPath: "/assets/blog/",
            },
          },
        }),
      },
    }),
  },
});
