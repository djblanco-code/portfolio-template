import Navigation from "@/app/_components/navigation";
import type { Metadata } from "next";
import { Inter, Instrument_Serif, Source_Serif_4 } from "next/font/google";
import cn from "classnames";
import { ThemeScript } from "@/app/_components/theme-switcher";
import Footer from "@/app/_components/footer";

import "../globals.css";
import { FULL_NAME, SITE, SITE_URL } from "@/lib/site-content";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});
const reading = Source_Serif_4({ subsets: ["latin"], variable: "--font-reading" });

const title = `${FULL_NAME} - ${SITE.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
  title,
  description: SITE.tagline,
  authors: [{ name: FULL_NAME }],
  creator: FULL_NAME,
  openGraph: {
    title,
    description: SITE.tagline,
    url: SITE_URL,
    siteName: FULL_NAME,
    images: [{ url: SITE.photo, alt: FULL_NAME }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.tagline,
    images: [SITE.photo],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#171717" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={cn(
          inter.variable,
          display.variable,
          reading.variable,
          "font-sans",
          "bg-neutral-50 text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-300",
        )}
      >
        <ThemeScript />
        <Navigation />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
