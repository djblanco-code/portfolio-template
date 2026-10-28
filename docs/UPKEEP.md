# Keeping your site running

Once your site is set up, it mostly takes care of itself. There's no server to restart and no database to back up. This page covers the small things worth doing now and then, roughly in order of how often they come up.

## Every time you write

Nothing extra. Write in `/keystatic`, click save, and your post goes live in about a minute.

If a post doesn't appear, open your project in Vercel and check the newest deployment. A red **Error** tells you the build failed, and clicking it shows why.

## About once a month (5 to 10 minutes)

**Review update pull requests.**
This template includes a tool called Dependabot, which checks once a month whether the building blocks your site uses have newer versions. When they do, it opens a pull request in your repository called something like "Bump the minor-and-patch group."

**Why it matters:** updates fix bugs and security issues. Small updates, done regularly, are much easier than one big update after a few years.

**What to do:**

1. Open the pull request on GitHub.
2. Scroll down to the checks. Vercel builds a preview of the change.
3. If the Vercel check is green, open the preview link, click around your site for a minute, and if everything looks normal, click **Merge pull request**.
4. If the Vercel check is red, don't merge. Leave it, or ask Claude Code (or a developer friend) to take a look: "This Dependabot pull request fails to build. Can you find out why and fix it?"

Updates to major versions (for example, a jump from version 15 to 16 of the main framework) come as separate pull requests and are more likely to need small code changes. It's fine to leave those for when you have time.

**Glance at your Vercel dashboard.**
Make sure the most recent deployment says **Ready**. If something has been failing quietly, this is where you'll notice.

## Every few months

**Keep your details current.**
Open `src/lib/site-content.ts` and update your role, projects, and timeline. It's easy to forget until someone visits your site after you've changed jobs.

**Check your links.**
Click your social links and project links on the live site. Links rot: projects get renamed, profiles change addresses.

## Once a year

**Renew your domain.**
If you bought a domain, check that auto-renew is turned on at your registrar, and that the card on file hasn't expired. A lapsed domain is the most common way personal sites disappear.

**Review who can edit.**
On GitHub, check your repository's **Settings**, then **Collaborators**. Anyone listed there can publish to your site through the editor.

## Backups

Your site and every post you've ever written live in your GitHub repository, with the full history of every change. That's already a good backup.

For extra peace of mind, download a copy once in a while: on your repository's page, click the green **Code** button, then **Download ZIP**.

## If something breaks

**Go back to a working version first, then investigate.**
In Vercel, open **Deployments**, find the last version that worked, click **⋯**, and choose **Promote to Production** (or **Instant Rollback**). Your site switches back immediately.

**Then find out what changed.**
In your repository on GitHub, click the clock icon labeled **Commits** to see every change, newest first, with what changed in each. If an edit caused the problem, open that commit and click **Revert** (or ask Claude Code to undo it).

## If a key leaks

If you accidentally share your GitHub App's client secret or your `KEYSTATIC_SECRET` (in a screenshot, a message, or a commit), replace it:

1. On your GitHub App's settings page, generate a new client secret and delete the old one.
2. Make up a new `KEYSTATIC_SECRET`.
3. Update both in Vercel under **Settings**, then **Environment Variables**, and redeploy.

The old keys stop working right away.

## What this costs

- **GitHub:** free.
- **Vercel:** free on the Hobby plan, which is meant for personal, non-commercial sites. A personal portfolio and blog fit comfortably.
- **Domain:** about $10 to $15 a year, if you want one.
- **Newsletter:** Buttondown has a free plan for small lists.
