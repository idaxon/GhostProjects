import type { Metadata } from "next";
import { JsonLd, webPageSchema, breadcrumbSchema, softwareApplicationSchema } from "../lib/structured-data";

export const metadata: Metadata = {
  title: "Ghost Browser – Privacy First Browser",
  description: "Get unrestricted, private, and secure access to the entire internet with Ghost Browser. Bypass firewalls and school networks with built-in decryption protocols.",
  keywords: [
    "Ghost Browser",
    "Ghost Browser download",
    "privacy browser",
    "bypass school firewall",
    "secure download",
    "unblocked browser",
    "anti-censorship browser",
    "Ghost Browser features"
  ],
  alternates: {
    canonical: "/ghost-browser",
  },
  openGraph: {
    title: "Ghost Browser – Privacy First Browser",
    description: "Get unrestricted, private, and secure access to the entire internet with Ghost Browser. Bypass firewalls and school networks with built-in decryption protocols.",
    url: "https://ghostprojects.in/ghost-browser",
    siteName: "Ghost Projects",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/spider.png",
        width: 800,
        height: 600,
        alt: "Ghost Browser Features and Downloads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghost Browser – Privacy First Browser",
    description: "Get unrestricted, private, and secure access to the entire internet with Ghost Browser. Bypass firewalls and school networks with built-in decryption protocols.",
    images: ["/spider.png"],
  },
};

export default function GhostBrowserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Ghost Browser page structured data: WebPage identity, product/software application, and breadcrumb navigation */}
      <JsonLd data={webPageSchema({
        title: "Ghost Browser – Privacy First Browser",
        description: "Get unrestricted, private, and secure access to the entire internet with Ghost Browser. Bypass firewalls and school networks with built-in decryption protocols.",
        path: "/ghost-browser",
      })} />
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Ghost Browser", path: "/ghost-browser" }])} />
      {children}
    </>
  );
}

