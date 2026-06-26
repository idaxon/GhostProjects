import type { Metadata } from "next";
import { JsonLd, webPageSchema, breadcrumbSchema } from "../lib/structured-data";

export const metadata: Metadata = {
  title: "About Ghost Projects",
  description: "Why we exist. Ghost Projects is focused on creating next-generation privacy-first technology, minimal digital experiences, and systems that respect user freedom.",
  keywords: [
    "About Ghost Projects",
    "Ghost Projects mission",
    "privacy-first philosophy",
    "independent software development",
    "minimal tech experiences"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Ghost Projects",
    description: "Why we exist. Ghost Projects is focused on creating next-generation privacy-first technology, minimal digital experiences, and systems that respect user freedom.",
    url: "https://ghostprojects.in/about",
    siteName: "Ghost Projects",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/spider.png",
        width: 800,
        height: 600,
        alt: "About Ghost Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ghost Projects",
    description: "Why we exist. Ghost Projects is focused on creating next-generation privacy-first technology, minimal digital experiences, and systems that respect user freedom.",
    images: ["/spider.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* About page structured data: WebPage identity + breadcrumb navigation */}
      <JsonLd data={webPageSchema({
        title: "About Ghost Projects",
        description: "Why we exist. Ghost Projects is focused on creating next-generation privacy-first technology, minimal digital experiences, and systems that respect user freedom.",
        path: "/about",
      })} />
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      {children}
    </>
  );
}

