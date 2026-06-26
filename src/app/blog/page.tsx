import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '../lib/queries'
import { urlFor } from '../lib/sanity'
import { JsonLd, webPageSchema, breadcrumbSchema } from '../lib/structured-data'
import styles from './blog.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and developer logs from Ghost Projects. Thoughts on privacy, network censorship, and independent technology.',
  keywords: [
    "Ghost Projects blog",
    "privacy technology blog",
    "censorship bypass articles",
    "anti-censorship technology",
    "Ghost Browser logs"
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Ghost Projects Blog',
    description: 'Articles and developer logs from Ghost Projects. Thoughts on privacy, network censorship, and independent technology.',
    url: 'https://ghostprojects.in/blog',
    siteName: 'Ghost Projects',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/spider.png',
        width: 800,
        height: 600,
        alt: 'Ghost Projects Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghost Projects Blog',
    description: 'Articles and developer logs from Ghost Projects. Thoughts on privacy, network censorship, and independent technology.',
    images: ['/spider.png'],
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className={styles.container}>
      {/* Blog page structured data: WebPage identity + breadcrumb navigation */}
      <JsonLd data={webPageSchema({
        title: "Blog | Ghost Projects",
        description: "Articles and developer logs from Ghost Projects. Thoughts on privacy, network censorship, and independent technology.",
        path: "/blog",
      })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])} />
      <h1 className={styles.heading}>Blog</h1>
      {posts.length === 0 && (
        <div className={styles.emptyContainer}>
          <div className={styles.emptyIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className={styles.emptyText}>
            No blogs yet. Our writers are still pretending to be productive.
          </p>
          <div className={styles.emptyTerminalLine}>
            <span className={styles.emptyCommand}>$ cat productivity.log</span>
            <span className={styles.emptyResponse}>status: inactive [waiting for inspiration]</span>
          </div>
        </div>
      )}
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.card}>
            {post.coverImage && (
              <img
                src={urlFor(post.coverImage).width(600).height(340).auto('format').url()}
                alt={post.title}
                className={styles.cardImage}
                loading="lazy"
                decoding="async"
              />
            )}
            <div className={styles.cardBody}>
              <p className={styles.meta}>
                {post.author} · {new Date(post.publishedDate).toLocaleDateString()}
              </p>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              {post.tags && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}