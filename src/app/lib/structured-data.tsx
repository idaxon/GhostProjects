/**
 * Structured Data (JSON-LD) utilities for Schema.org markup.
 *
 * Provides reusable helper functions to generate valid JSON-LD objects
 * and a React component to render them as invisible <script> tags.
 *
 * Usage: Import JsonLd component and schema builder functions into
 * layouts or pages, then render <JsonLd data={...} /> in the JSX.
 */

import React from 'react'

// ─── Constants ───────────────────────────────────────────────────────
const SITE_URL = 'https://ghostprojects.in'
const SITE_NAME = 'Ghost Projects'
const SITE_DESCRIPTION =
  'Ghost Projects builds privacy-first tools like Ghost Browser to bypass network censorship, firewalls, and protect digital freedom.'
const LOGO_URL = `${SITE_URL}/favicon.svg`

// ─── JSON-LD Renderer Component ──────────────────────────────────────
// Renders a <script type="application/ld+json"> tag with the given data.
// This is invisible to users and only consumed by search engine crawlers.
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Organization Schema ─────────────────────────────────────────────
// Represents Ghost Projects as an organization entity.
// Placed once in the root layout so it appears on every page.
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    description: SITE_DESCRIPTION,
    sameAs: [],
  }
}

// ─── WebSite Schema ──────────────────────────────────────────────────
// Represents the website itself with publisher reference.
// Placed once in the root layout alongside Organization.
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
  }
}

// ─── WebPage Schema ──────────────────────────────────────────────────
// Generates a WebPage schema for any individual page.
// Each page should call this with its own title, description, and URL path.
export function webPageSchema({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

// ─── BreadcrumbList Schema ───────────────────────────────────────────
// Generates breadcrumbs from an array of {name, path} items.
// The homepage is always prepended as the first breadcrumb item.
// Should NOT be used on the homepage itself.
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const allItems = [{ name: 'Home', path: '/' }, ...items]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

// ─── SoftwareApplication Schema ──────────────────────────────────────
// Represents Ghost Browser as a downloadable software application.
// Used on the /ghost-browser product page.
export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ghost Browser',
    description:
      'A privacy-first desktop web browser that bypasses network censorship, firewalls, and school restrictions to provide unrestricted, private, and secure internet access.',
    url: `${SITE_URL}/ghost-browser`,
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Windows, macOS, Linux',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

// ─── BlogPosting Schema ─────────────────────────────────────────────
// Generates an Article/BlogPosting schema for individual blog posts.
// Used on /blog/[slug] pages with dynamic post data.
export function blogPostingSchema({
  title,
  description,
  slug,
  author,
  publishedDate,
  coverImageUrl,
}: {
  title: string
  description: string
  slug: string
  author: string
  publishedDate: string
  coverImageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: publishedDate,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    ...(coverImageUrl ? { image: coverImageUrl } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  }
}

// ─── Testimonials (Reviews) Schema ──────────────────────────────────
// Generates schema markup for homepage testimonials.
export function testimonialsReviewSchema() {
  const reviews = [
    {
      name: "Beta Tester",
      body: "Finally, a browser that respects privacy. No tracking, no intrusive data collection, just the web.",
      stars: 5,
    },
    {
      name: "Early User",
      body: "Ghost Browser feels incredibly fast. Pages load instantly, and browsing is smooth without unnecessary delays.",
      stars: 5,
    },
    {
      name: "Early Adopter",
      body: "The clean interface and fast performance make Ghost Browser my default browser for everyday browsing.",
      stars: 5,
    },
    {
      name: "Verified User",
      body: "I love that I can browse without feeling like every click is being monitored. It feels refreshing.",
      stars: 5,
    },
    {
      name: "Community Member",
      body: "Fast, lightweight, and simple. Exactly what a modern browser should be.",
      stars: 5,
    },
    {
      name: "Desktop User",
      body: "The browsing experience is smooth, and websites open noticeably faster compared to many browsers I've used.",
      stars: 5,
    },
    {
      name: "Speed User",
      body: "No lagging, no rendering delays. Website loads are instant. A game changer.",
      stars: 5,
    },
    {
      name: "Active User",
      body: "No unnecessary clutter, no distractions, just a clean and secure browsing experience.",
      stars: 5,
    },
    {
      name: "Privacy Advocate",
      body: "Blocks all tracking scripts out-of-the-box. My web activity stays mine.",
      stars: 5,
    },
    {
      name: "Early Supporter",
      body: "Privacy isn't just a feature here—it feels like the foundation of the browser.",
      stars: 5,
    },
  ]

  return reviews.map((rev) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: 'Ghost Browser',
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Windows, macOS, Linux',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    author: {
      '@type': 'Person',
      name: rev.name,
    },
    reviewBody: rev.body,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(rev.stars),
      bestRating: '5',
    },
  }))
}

