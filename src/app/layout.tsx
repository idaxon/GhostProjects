import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { JsonLd, organizationSchema, webSiteSchema } from "./lib/structured-data";
import DynamicCursor from "./components/DynamicCursor";


const instrumentSans = Instrument_Sans({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ghostprojects.in"),
  title: {
    default: "Ghost Projects – Privacy Infrastructure & Ghost Browser",
    template: "%s | Ghost Projects",
  },
  description: "Official site of Ghost Projects. We build tools like Ghost Browser to bypass network censorship, firewalls, and protect your digital privacy.",
  keywords: [
    "Ghost Projects",
    "GhostProjects",
    "Ghost Browser",
    "Ghost Browser download",
    "bypass firewall",
    "school bypass browser",
    "privacy infrastructure",
    "digital freedom",
    "unblock browser",
    "privacy first browser",
  ],
  authors: [{ name: "Ghost Projects Team", url: "https://ghostprojects.in" }],
  creator: "Ghost Projects Team",
  publisher: "Ghost Projects",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    title: "Ghost Projects – Privacy Infrastructure & Ghost Browser",
    description: "Official site of Ghost Projects. We build tools like Ghost Browser to bypass network censorship, firewalls, and protect your digital privacy.",
    url: "https://ghostprojects.in",
    siteName: "Ghost Projects",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/spider.png",
        width: 800,
        height: 600,
        alt: "Ghost Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghost Projects – Privacy Infrastructure & Ghost Browser",
    description: "Official site of Ghost Projects. We build tools like Ghost Browser to bypass network censorship, firewalls, and protect your digital privacy.",
    images: ["/spider.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Global structured data: Organization + WebSite (invisible to users, consumed by crawlers) */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <div className="scanline"></div>
        <DynamicCursor />
        <Navbar />
        <div className="main-content-wrapper">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}