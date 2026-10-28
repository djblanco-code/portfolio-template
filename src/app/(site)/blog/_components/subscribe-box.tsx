import { NEWSLETTER_FORM_ACTION } from "@/lib/site-content";

export const SUBSCRIBE_ANCHOR = "subscribe";

export default function SubscribeBox({ className = "" }: { className?: string }) {
  return (
    <section
      id={SUBSCRIBE_ANCHOR}
      className={`scroll-mt-24 rounded-sm bg-neutral-900 p-8 text-white dark:bg-neutral-100 dark:text-neutral-900 ${className}`}
    >
      <h2 className="font-display text-3xl">Get new posts</h2>
      {NEWSLETTER_FORM_ACTION ? (
        <>
          <p className="mb-5 mt-2 text-sm text-neutral-300 dark:text-neutral-600">
            New writing straight to your inbox. No spam, unsubscribe anytime.
          </p>
          <form
            action={NEWSLETTER_FORM_ACTION}
            method="post"
            target="_blank"
            className="flex flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-full border border-neutral-700 bg-transparent px-4 py-2.5 text-white placeholder:text-neutral-500 focus:border-white focus:outline-none dark:border-neutral-300 dark:text-neutral-900 dark:focus:border-neutral-900"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-700"
            >
              Subscribe
            </button>
          </form>
        </>
      ) : null}
      <p className="mt-3 text-sm text-neutral-300 dark:text-neutral-600">
        {NEWSLETTER_FORM_ACTION ? "Or follow along with the " : "Follow along with the "}
        <a href="/rss.xml" className="font-medium text-white underline underline-offset-4 dark:text-neutral-900">
          RSS feed
        </a>
        .
      </p>
    </section>
  );
}
