import styles from './privacy.module.css'
import type { Metadata } from 'next'
import { JsonLd, webPageSchema, breadcrumbSchema } from '../lib/structured-data'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Ghost Browser is built on a simple principle: Your internet activity belongs to you. Read our commitment to absolute zero-logs privacy.',
  keywords: [
    "Ghost Browser privacy",
    "privacy policy",
    "zero logs browser",
    "no tracking policy",
    "data protection"
  ],
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Ghost Projects',
    description: 'Ghost Browser is built on a simple principle: Your internet activity belongs to you. Read our commitment to absolute zero-logs privacy.',
    url: 'https://ghostprojects.in/privacy-policy',
    siteName: 'Ghost Projects',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/spider.png',
        width: 800,
        height: 600,
        alt: 'Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Ghost Projects',
    description: 'Ghost Browser is built on a simple principle: Your internet activity belongs to you. Read our commitment to absolute zero-logs privacy.',
    images: ['/spider.png'],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.container}>
      {/* Privacy Policy page structured data: WebPage identity + breadcrumb navigation */}
      <JsonLd data={webPageSchema({
        title: "Privacy Policy | Ghost Projects",
        description: "Ghost Browser is built on a simple principle: Your internet activity belongs to you. Read our commitment to absolute zero-logs privacy.",
        path: "/privacy-policy",
      })} />
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy-policy" }])} />


      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.effectiveDate}>Effective Date: May 20th, 2026 · Last Updated: June 2025</p>
        <h1 className={styles.heroTitle}>Privacy Policy</h1>
        <p className={styles.heroTagline}>
          Your internet activity belongs to you.
        </p>
      </section>

      {/* Commitment */}
      <section className={styles.commitmentBanner}>
        <p>
          Ghost Browser is designed to provide private, secure, and unrestricted access to the internet
          without collecting, storing, or monetizing personal browsing information.
          We do not build our business around user data. We build technology that protects it.
        </p>
      </section>

      {/* Sections */}
      <div className={styles.content}>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>01</span>
            Data We Do Not Collect
          </h2>
          <p className={styles.sectionIntro}>Ghost Browser does not collect, store, or monitor:</p>
          <div className={styles.pillGrid}>
            {[
              'Browsing history', 'Websites visited', 'Search queries',
              'Cookies or website activity', 'Browsing patterns', 'IP addresses',
              'Location data', 'Device fingerprints', 'Passwords',
              'Bookmarks', 'Personal files', 'User behavior profiles',
              'Advertising identifiers',
            ].map((item) => (
              <span key={item} className={styles.pill}>{item}</span>
            ))}
          </div>
          <p className={styles.note}>Your browsing activity remains local to your device. Ghost Browser does not create a record of your online activity.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>02</span>
            No User Tracking & No Profiling
          </h2>
          <p>Ghost Browser does not track users across websites. We do not create advertising profiles, sell user information, share browsing information with third parties, monitor user activity, or build behavioral databases.</p>
          <p className={styles.highlight}>Ghost Browser exists to reduce digital tracking — not participate in it.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>03</span>
            Account IDs & Privacy Architecture
          </h2>
          <p>For users who create a Ghost Browser account, we use a privacy-focused identification system. Each user receives a unique <strong>Ghost ID</strong>.</p>
          <div className={styles.featureList}>
            {[
              'Randomly generated',
              'Not connected to your browsing activity',
              'Not publicly identifiable',
              'Not linked to your real-world identity',
              'Protected through secure authentication',
            ].map((item) => (
              <div key={item} className={styles.featureItem}>
                <span className={styles.featureDot} />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>04</span>
            Logging & Diagnostic Reports
          </h2>
          <p>Ghost Browser follows a privacy-first logging approach. We do not create usage logs, log websites visited, browsing sessions, user searches, or personal information.</p>
          <p>The only logs that may exist are limited technical diagnostic reports generated for resolving user-reported issues, debugging software problems, improving system reliability, maintaining protocol performance, and investigating technical failures.</p>
          <p className={styles.note}>These reports are associated only with a secure Ghost ID reference — never with your identity, browsing history, or personal information.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>05</span>
            What Diagnostic Information May Include
          </h2>
          <div className={styles.featureList}>
            {[
              'Application version',
              'Browser version',
              'Operating system information',
              'Error codes',
              'Crash information',
              'System performance details',
              'Network error information required to reproduce an issue',
            ].map((item) => (
              <div key={item} className={styles.featureItem}>
                <span className={styles.featureDot} />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>06</span>
            Data Security
          </h2>
          <div className={styles.pillGrid}>
            {[
              'Encrypted data transmission',
              'Secure authentication systems',
              'Restricted internal access',
              'Minimal data storage',
              'Privacy-focused system design',
            ].map((item) => (
              <span key={item} className={styles.pill}>{item}</span>
            ))}
          </div>
          <p className={styles.note}>Access to technical reports is limited to authorized personnel responsible for maintaining and improving Ghost Browser.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>07</span>
            Ghost Browser Local Privacy Features
          </h2>
          <div className={styles.featureList}>
            {[
              'Tracker protection',
              'Fingerprint protection',
              'Cookie isolation',
              'Encrypted DNS support',
              'HTTPS enforcement',
              'Privacy-first browsing architecture',
            ].map((item) => (
              <div key={item} className={styles.featureItem}>
                <span className={styles.featureDot} />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>08</span>
            Third-Party Services
          </h2>
          <p>Ghost Browser minimizes dependency on third-party data collection services. When external services are required for functionality or security, we evaluate them based on privacy, security, and necessity.</p>
          <p className={styles.highlight}>We do not allow third parties to use Ghost Browser user data for advertising, profiling, or tracking.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>09</span>
            Data Retention
          </h2>
          <p>Ghost Projects follows a minimal retention approach. Technical reports are retained only for as long as required for resolving reported issues, maintaining system stability, and improving Ghost Browser performance. When information is no longer required, it is removed or anonymized.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>10</span>
            Your Control
          </h2>
          <p>You remain in control of your data. Ghost Browser is designed so that your browsing activity stays private, your personal information is not collected unnecessarily, and your digital identity is protected.</p>
          <p className={styles.highlight}>Privacy is the default — not an optional setting.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>11</span>
            Changes to This Policy
          </h2>
          <p>We may update this Privacy Policy as Ghost Browser evolves. Any changes will be reflected with an updated revision date. We encourage users to review this policy periodically.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>12</span>
            Contact
          </h2>
          <p>For privacy-related questions or concerns:</p>
          <div className={styles.contactBox}>
            <p><strong>Ghost Projects</strong></p>
            <a href="https://www.ghostprojects.in/" className={styles.contactLink}>
              ghostprojects.in
            </a>
          </div>
        </section>

      </div>

      {/* Footer tagline */}
      <div className={styles.footerTagline}>
        <p>Privacy is not a feature.</p>
        <p>Privacy is the foundation.</p>
        <p className={styles.taglineBrand}>Ghost Browser — The Internet Without Walls.</p>
      </div>

    </main>
  )
}