/**
 * Everything personal about the site lives in this one file.
 * Change the values below, save, and the whole site updates.
 * (Blog posts are separate: you write those in the editor at /keystatic.)
 */

export const SITE = {
  /** Your name, split in two because the big heading styles each part differently. */
  firstName: "John",
  lastName: "Doe",
  /** Shown above your name on the home page, and under it at the end of blog posts. */
  role: "Software Engineer",
  /** One short sentence about you. Used on the home page, in the footer, and in link previews. */
  tagline: "I build thoughtful software and write about what I learn.",
  /** The web address your site will live at. Use the Vercel address until you have your own domain. */
  url: "https://example.com",
  /** Where people can reach you. */
  email: "hello@example.com",
  /** Your GitHub username and this repository's name, like "johndoe/portfolio". The editor saves posts here. */
  githubRepo: "your-username/your-repo",
  /** The photo used on the home page and on blog posts. Put your own image in the public folder and change this. */
  photo: "/profile-placeholder.png",
  /** The heading above your timeline. Make it yours, or keep it simple. */
  journeyTitle: "My journey",
};

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/your-profile" },
  { label: "GitHub", href: "https://github.com/your-username" },
];

/** Shown in the home page's "Previously & currently" row: places you've worked or studied. */
export const PLACES = ["Company One", "Company Two", "Your University"];

export type SiteProject = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github_url: string;
  live_url: string;
};

/** Your projects. Copy a block to add another one. Leave a link as "" if you don't have one. */
export const STATIC_PROJECTS: SiteProject[] = [
  {
    id: 1,
    title: "Project Name",
    description: "One or two sentences about what it does and who it's for.",
    technologies: ["Next.js", "TypeScript"],
    github_url: "https://github.com/your-username/project",
    live_url: "",
  },
];

export type JourneyMilestone = {
  /** Left-column label: a year range, or a short word when there's no single range. */
  when: string;
  title: string;
  where: string;
  description: string;
};

/** Your timeline, newest first. Copy a block to add a step, or delete one you don't need. */
export const JOURNEY: JourneyMilestone[] = [
  {
    when: "2024 — Now",
    title: "Software Engineer",
    where: "Company One",
    description: "A sentence about what you work on.",
  },
  {
    when: "2023",
    title: "Software Engineering Intern",
    where: "Company Two",
    description: "A sentence about what you built or learned.",
  },
  {
    when: "2019 — 2023",
    title: "B.S. Computer Science",
    where: "Your University",
    description: "Clubs, leadership, or anything you're proud of.",
  },
];

/**
 * Newsletter signup form endpoint. Leave empty to hide the email box (the RSS link still shows).
 * For Buttondown: "https://buttondown.com/api/emails/embed-subscribe/<your-username>".
 */
export const NEWSLETTER_FORM_ACTION = "";

// Derived values used around the site. You don't need to edit these.
export const FULL_NAME = `${SITE.firstName} ${SITE.lastName}`;
export const CONTACT_EMAIL = SITE.email;
export const SITE_URL = SITE.url.replace(/\/$/, "");
