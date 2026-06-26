"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <a
        href="#"
        className="footer-logo"
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <svg width="24" height="16" viewBox="0 0 32 22" fill="none">
          <ellipse cx="16" cy="11" rx="14" ry="9" stroke="#555" strokeWidth="1.2" />
          <ellipse cx="16" cy="11" rx="4" ry="4" fill="#555" />
        </svg>
        GHOST PROJECTS
      </a>

      <div className="footer-links">
        <Link href="/about">ABOUT</Link>
        <Link href="/privacy-policy">PRIVACY POLICY</Link>
        <Link href="/terms-of-service">TERMS OF SERVICE</Link>
      </div>
    </footer>
  );
}