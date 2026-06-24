import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Footer from "./components/Footer"; 

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
  title: "Ghost Projects - Privacy Infrastructure & Ghost Browser",
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
    "unblock browser"
  ],
  openGraph: {
    title: "Ghost Projects - Privacy Infrastructure & Ghost Browser",
    description: "Official site of Ghost Projects. We build tools like Ghost Browser to bypass network censorship, firewalls, and protect your digital privacy.",
    url: "https://ghostprojects.in",
    siteName: "Ghost Projects",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghost Projects - Privacy Infrastructure & Ghost Browser",
    description: "Official site of Ghost Projects. We build tools like Ghost Browser to bypass network censorship, firewalls, and protect your digital privacy.",
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
      <body>
        <div className="scanline"></div>
        <Cursor />
        <Navbar />
        <div className="main-content-wrapper">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}