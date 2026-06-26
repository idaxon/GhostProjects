import { getAllPosts, getPostBySlug } from '../../lib/queries'
import { urlFor } from '../../lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonLd, webPageSchema, breadcrumbSchema, blogPostingSchema } from '../../lib/structured-data'
import styles from './post.module.css'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : '/spider.png'

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on Ghost Projects blog.`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on Ghost Projects blog.`,
      url: `https://ghostprojects.in/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read ${post.title} on Ghost Projects blog.`,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

const components = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
      if (!value?.asset?._ref) return null
      return (
        <img
          src={urlFor(value).width(800).fit('max').auto('format').url()}
          alt={value.alt || 'Blog image'}
          loading="lazy"
          decoding="async"
        />
      )
    },
  },
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined

  return (
    <main className={styles.container}>
      {/* Blog post structured data: WebPage identity, Breadcrumb navigation, and BlogPosting schema */}
      <JsonLd data={webPageSchema({
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Ghost Projects blog.`,
        path: `/blog/${slug}`,
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${slug}` },
      ])} />
      <JsonLd data={blogPostingSchema({
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Ghost Projects blog.`,
        slug: slug,
        author: post.author,
        publishedDate: post.publishedDate,
        coverImageUrl,
      })} />
      <p className={styles.meta}>
        {post.author} · {new Date(post.publishedDate).toLocaleDateString()}
      </p>
      <h1 className={styles.title}>{post.title}</h1>
      {post.coverImage && (
        <img
          src={urlFor(post.coverImage).width(1200).height(600).auto('format').url()}
          alt={post.title}
          className={styles.cover}
          fetchPriority="high"
          decoding="async"
        />
      )}
      {post.tags && (
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
      <article className={styles.body}>
        <PortableText value={post.body} components={components} />
      </article>
    </main>
  )
}