import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Editor",
  robots: { index: false, follow: false },
};

// The editor gets its own root layout so the site's nav and styles stay out of it.
export default function Layout() {
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
