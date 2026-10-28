import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

// Outside development, makeRouteHandler throws when GitHub storage is missing its
// credentials, which would fail the whole build. Until they're set in Vercel, only
// the editor is unavailable. In development it runs the GitHub App setup flow instead.
const isConfigured =
  config.storage.kind !== "github" ||
  process.env.NODE_ENV === "development" ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  );

const notConfigured = () =>
  new Response("Keystatic is not set up yet. See the README for the GitHub setup steps.", {
    status: 503,
  });

export const { POST, GET } = isConfigured
  ? makeRouteHandler({ config })
  : { POST: notConfigured, GET: notConfigured };
