import styles from './terms.module.css'

export const metadata = {
  title: 'Terms of Service — Ghost Browser',
  description: 'Terms governing your access to and use of Ghost Browser by Ghost Projects.',
}

const sections = [
  {
    number: '01',
    title: 'Introduction',
    content: `Welcome to Ghost Browser, developed by Ghost Projects. These Terms of Service govern your access to and use of Ghost Browser, its software, services, features, and related technologies. By downloading, installing, accessing, or using Ghost Browser, you agree to be bound by these Terms. If you do not agree, please do not use Ghost Browser.`,
  },
  {
    number: '02',
    title: 'About Ghost Browser',
    content: `Ghost Browser is a privacy-focused web browser designed to provide users with a secure, private, and unrestricted internet experience.`,
    pills: [
      'Privacy-first browsing',
      'Secure internet access',
      'User-controlled digital experiences',
      'Advanced browser security',
      'Protection against tracking',
    ],
  },
  {
    number: '03',
    title: 'Eligibility',
    content: `You may use Ghost Browser if you are legally permitted to enter into these Terms. By using Ghost Browser, you confirm that you have the legal ability to accept these Terms, your use complies with applicable laws and regulations, and you will use the software responsibly.`,
  },
  {
    number: '04',
    title: 'License to Use Ghost Browser',
    content: `Ghost Projects grants you a limited, personal, non-exclusive, non-transferable license to use Ghost Browser. This license allows you to install Ghost Browser on supported devices, access available browser features, and use Ghost Browser for personal or authorized professional purposes. This license does not transfer ownership of Ghost Browser or its technology.`,
  },
  {
    number: '05',
    title: 'User Responsibilities',
    content: `You are responsible for how you use Ghost Browser. You agree not to use Ghost Browser to violate applicable laws, access systems without authorization, distribute malicious software, harm networks or infrastructure, conduct illegal activities, or abuse security features. Ghost Browser is designed to provide privacy and freedom online — not to enable unlawful activity.`,
  },
  {
    number: '06',
    title: 'Privacy & Data Protection',
    content: `Ghost Projects respects user privacy. Ghost Browser is designed around a minimal-data philosophy. Your use of Ghost Browser is governed by our Privacy Policy.`,
    pills: [
      'We do not sell user information',
      'No advertising profiles',
      'No browsing activity monitoring',
      'No browsing history stored',
      'No tracking of websites visited',
    ],
  },
  {
    number: '07',
    title: 'Account System & Ghost ID',
    content: `Certain Ghost Browser features may require an account. Accounts are identified using secure Ghost IDs which are randomly generated, designed to protect user privacy, not publicly linked to user identity, and not connected to browsing activity. Users are responsible for maintaining the security of their account credentials.`,
  },
  {
    number: '08',
    title: 'Technical Logs & Diagnostics',
    content: `Ghost Browser does not maintain browsing activity logs. We may generate limited technical diagnostic reports for resolving user-reported issues, debugging technical problems, improving reliability, and maintaining system performance. Such reports are not intended to identify users or track online activity.`,
  },
  {
    number: '09',
    title: 'Intellectual Property',
    content: `All rights, ownership, and intellectual property related to Ghost Browser — including software, source code, designs, branding, technology, GhostStack systems, and related infrastructure — remain the property of Ghost Projects. You may not copy, modify, reverse engineer, redistribute, sell, or create derivative works without written permission from Ghost Projects.`,
  },
  {
    number: '10',
    title: 'Updates & Changes',
    content: `Ghost Projects may update Ghost Browser from time to time. Updates may include security improvements, feature additions, performance improvements, and bug fixes. Some updates may be required to continue using certain features.`,
  },
  {
    number: '11',
    title: 'Third-Party Services',
    content: `Ghost Browser may interact with third-party technologies or services required for functionality, security, or connectivity. Ghost Projects does not control third-party services and is not responsible for their independent practices.`,
  },
  {
    number: '12',
    title: 'Service Availability',
    content: `We aim to maintain reliable service; however, Ghost Browser may occasionally experience maintenance periods, technical issues, service interruptions, or feature changes. Ghost Projects does not guarantee uninterrupted availability.`,
  },
  {
    number: '13',
    title: 'Disclaimer',
    content: `Ghost Browser is provided on an "as available" basis. While Ghost Projects works to provide secure and reliable technology, we do not guarantee that every website will always be accessible, all network restrictions can always be bypassed, or every security threat can be prevented. Users remain responsible for their own online activity.`,
  },
  {
    number: '14',
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law, Ghost Projects is not responsible for losses caused by misuse of the software, damages resulting from unauthorized use, third-party services, or user actions outside the intended purpose of Ghost Browser.`,
  },
  {
    number: '15',
    title: 'Termination',
    content: `Ghost Projects may restrict or terminate access to Ghost Browser if these Terms are violated, the service is abused, or security risks are created. Users may stop using Ghost Browser at any time by uninstalling the application.`,
  },
  {
    number: '16',
    title: 'Changes to These Terms',
    content: `Ghost Projects may update these Terms as technology, services, or legal requirements evolve. Continued use of Ghost Browser after updates means you accept the revised Terms.`,
  },
]

export default function TermsOfServicePage() {
  return (
    <main className={styles.container}>

      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.effectiveDate}>Effective Date: June 2026 · Last Updated: June 2026</p>
        <h1 className={styles.heroTitle}>Terms of Service</h1>
        <p className={styles.heroTagline}>
          Secure. Private. Fast.
        </p>
      </section>

      {/* Banner */}
      <section className={styles.commitmentBanner}>
        <p>
          By downloading, installing, accessing, or using Ghost Browser, you agree to be bound by these Terms.
          Ghost Browser is built to put users back in control of their online experience.
        </p>
      </section>

      {/* Sections */}
      <div className={styles.content}>
        {sections.map((section) => (
          <section key={section.number} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>{section.number}</span>
              {section.title}
            </h2>
            <p>{section.content}</p>
            {section.pills && (
              <div className={styles.pillGrid}>
                {section.pills.map((pill) => (
                  <span key={pill} className={styles.pill}>{pill}</span>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Contact */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>17</span>
            Contact
          </h2>
          <p>For questions regarding these Terms:</p>
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
        <p>Ghost Browser</p>
        <p className={styles.taglineBrand}>The Internet Without Walls.</p>
        <p className={styles.taglineSub}>Secure. Private. Fast.</p>
      </div>

    </main>
  )
}