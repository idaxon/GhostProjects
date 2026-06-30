"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd, webPageSchema, testimonialsReviewSchema } from "./lib/structured-data";

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#C0392B" className="testimonial-star" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

interface Testimonial {
  id: string;
  initials: string;
  name: string;
  role: string;
  quote: string;
  stars?: number;
  featured?: boolean;
  quoteOnly?: boolean;
  time?: string;
  verif?: string;
}

const testimonialsData: Record<"all" | "speed" | "privacy", Testimonial[]> = {
  all: [
    {
      id: "t1",
      initials: "BT",
      name: "Beta Tester",
      role: "@beta_test",
      stars: 5,
      quote: "Finally, a browser that respects privacy. No tracking, no intrusive data collection, just the web."
    },
    {
      id: "featured",
      initials: "EU",
      name: "Early User",
      role: "@early_user",
      stars: 5,
      quote: "Ghost Browser feels incredibly fast. Pages load instantly, and browsing is smooth without unnecessary delays.",
      featured: true,
      time: "2h ago",
      verif: "Verified Supporter"
    },
    {
      id: "t2",
      initials: "EA",
      name: "Early Adopter",
      role: "@early_adopter",
      stars: 5,
      quote: "The clean interface and fast performance make Ghost Browser my default browser for everyday browsing."
    },
    {
      id: "t3",
      initials: "VU",
      name: "Verified User",
      role: "@verified_u",
      stars: 5,
      quote: "I love that I can browse without feeling like every click is being monitored. It feels refreshing."
    },
    {
      id: "t4",
      initials: "CM",
      name: "Community Member",
      role: "@community_mbr",
      quote: "Fast, lightweight, and simple. Exactly what a modern browser should be.",
      quoteOnly: true
    }
  ],
  speed: [
    {
      id: "t2",
      initials: "EA",
      name: "Early Adopter",
      role: "@early_adopter",
      stars: 5,
      quote: "The clean interface and fast performance make Ghost Browser my default browser for everyday browsing."
    },
    {
      id: "featured",
      initials: "EU",
      name: "Early User",
      role: "@early_user",
      stars: 5,
      quote: "Ghost Browser feels incredibly fast. Pages load instantly, and browsing is smooth without unnecessary delays.",
      featured: true,
      time: "2h ago",
      verif: "Verified Supporter"
    },
    {
      id: "t5",
      initials: "DU",
      name: "Desktop User",
      role: "@desktop_usr",
      stars: 5,
      quote: "The browsing experience is smooth, and websites open noticeably faster compared to many browsers I've used."
    },
    {
      id: "t6",
      initials: "SU",
      name: "Speed User",
      role: "@speed_usr",
      stars: 5,
      quote: "No lagging, no rendering delays. Website loads are instant. A game changer."
    },
    {
      id: "t4",
      initials: "CM",
      name: "Community Member",
      role: "@community_mbr",
      quote: "Fast, lightweight, and simple. Exactly what a modern browser should be.",
      quoteOnly: true
    }
  ],
  privacy: [
    {
      id: "t1",
      initials: "BT",
      name: "Beta Tester",
      role: "@beta_test",
      stars: 5,
      quote: "Finally, a browser that respects privacy. No tracking, no intrusive data collection, just the web."
    },
    {
      id: "featured_privacy",
      initials: "AU",
      name: "Active User",
      role: "@active_usr",
      stars: 5,
      quote: "No unnecessary clutter, no distractions, just a clean and secure browsing experience.",
      featured: true,
      time: "1h ago",
      verif: "Verified Supporter"
    },
    {
      id: "t3",
      initials: "VU",
      name: "Verified User",
      role: "@verified_u",
      stars: 5,
      quote: "I love that I can browse without feeling like every click is being monitored. It feels refreshing."
    },
    {
      id: "t8",
      initials: "PA",
      name: "Privacy Advocate",
      role: "@priv_advocate",
      stars: 5,
      quote: "Blocks all tracking scripts out-of-the-box. My web activity stays mine."
    },
    {
      id: "t7",
      initials: "ES",
      name: "Early Supporter",
      role: "@early_supporter",
      quote: "Privacy isn't just a feature here—it feels like the foundation of the browser.",
      quoteOnly: true
    }
  ]
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [filter, setFilter] = useState<"all" | "speed" | "privacy">("all");
  const [displayFilter, setDisplayFilter] = useState<"all" | "speed" | "privacy">("all");
  const [isFading, setIsFading] = useState(false);

  const handleFilterChange = (newFilter: "all" | "speed" | "privacy") => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setIsFading(true);
    setTimeout(() => {
      setDisplayFilter(newFilter);
      setIsFading(false);
    }, 120);
  };

  const renderTestimonialCard = (review: Testimonial, className: string = "") => {
    if (!review) return null;

    if (review.featured) {
      return (
        <div className={`bento-card bento-featured bento-col-2 bento-row-2 ${className}`} key={review.id}>
          <div className={`bento-card-inner ${isFading ? "fading" : ""}`}>
            <div className="testimonial-header">
              <div className="avatar-ring">
                <div className="avatar-initials">{review.initials}</div>
              </div>
              <div className="testimonial-meta">
                <span className="testimonial-name">{review.name}</span>
                <span className="testimonial-role">{review.role}</span>
              </div>
              <div className="testimonial-stars-wrap">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <blockquote className="testimonial-quote">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <div className="bento-featured-footer">
              <span>{review.time || "2h ago"}</span>
              <span className="bento-verif">{review.verif || "Verified Supporter"}</span>
            </div>
          </div>
        </div>
      );
    }

    if (review.quoteOnly) {
      return (
        <div className={`bento-card bento-t4 ${className}`} key={review.id}>
          <div className={`bento-card-inner ${isFading ? "fading" : ""}`}>
            <blockquote className="testimonial-quote-large" style={{ fontSize: "14px", lineHeight: "1.5", marginBottom: "16px" }}>
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <div className="testimonial-footer" style={{ marginTop: "auto" }}>
              <div className="avatar-ring" style={{ width: "32px", height: "32px" }}>
                <div className="avatar-initials" style={{ fontSize: "11px" }}>{review.initials}</div>
              </div>
              <div className="testimonial-meta" style={{ gap: "0px", marginLeft: "10px" }}>
                <span className="testimonial-name" style={{ fontSize: "12px" }}>{review.name}</span>
                <span className="testimonial-role" style={{ fontSize: "10px" }}>{review.role}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`bento-card ${className}`} key={review.id}>
        <div className={`bento-card-inner ${isFading ? "fading" : ""}`}>
          <div className="testimonial-header">
            <div className="avatar-ring">
              <div className="avatar-initials">{review.initials}</div>
            </div>
            <div className="testimonial-meta">
              <span className="testimonial-name">{review.name}</span>
              <span className="testimonial-role">{review.role}</span>
            </div>
          </div>
          <div className="testimonial-stars-wrap">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <blockquote className="testimonial-quote">
            &ldquo;{review.quote}&rdquo;
          </blockquote>
        </div>
      </div>
    );
  };



  // Refs for scroll-synced spider thread
  const threadContainerRef = useRef<HTMLDivElement>(null);
  const spiderWrapRef = useRef<HTMLDivElement>(null);

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // ── SPIDER IDLE HANGING ANIMATION ──
    let simulationId: number;

    const runSimulation = () => {
      const scrollY = window.scrollY;
      const clientHeight = window.innerHeight;

      // Calculate opacity fade out as we scroll past the landing page
      // Starts fading when scroll reaches 20% of viewport, fully disappears by 60% of viewport
      let threadOpacity = 1;
      const fadeStart = clientHeight * 0.2;
      const fadeEnd = clientHeight * 0.6;
      if (scrollY > fadeStart) {
        threadOpacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }

      if (threadContainerRef.current) {
        threadContainerRef.current.style.opacity = `${threadOpacity}`;
        threadContainerRef.current.style.visibility = threadOpacity <= 0 ? "hidden" : "visible";
      }

      if (spiderWrapRef.current) {
        const time = Date.now();
        // Slow, natural idle sway (rotation)
        const idleSway = Math.sin(time * 0.0012) * 2.5;
        // Slow, natural vertical float (bobbing)
        const idleFloat = Math.cos(time * 0.0018) * 5;

        // Apply physical-like idle transform (vertical bobbing and sway rotation)
        spiderWrapRef.current.style.transform = `translateY(${idleFloat}px) rotate(${idleSway}deg)`;
      }

      simulationId = requestAnimationFrame(runSimulation);
    };

    simulationId = requestAnimationFrame(runSimulation);

    // ── SCROLL REVEALS ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    revealElements.forEach((el) => revealObserver.observe(el));

    // ── ACTIVE DOT MONITORING ──
    const sections = ["hero", "projects", "future"];
    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) dotObserver.observe(el);
    });

    // Clean up
    return () => {
      cancelAnimationFrame(simulationId);
      revealObserver.disconnect();
      dotObserver.disconnect();
    };
  }, []);

  const activeReviews = testimonialsData[displayFilter];
  const featuredReview = activeReviews.find((r) => r.featured) || activeReviews[0];
  const standardReviews = activeReviews.filter((r) => !r.featured);

  return (
    <>
      {/* Homepage WebPage structured data (crawlers identify this page's main topic/entity) */}
      <JsonLd data={webPageSchema({
        title: "Ghost Projects – Privacy Infrastructure & Ghost Browser",
        description: "Official site of Ghost Projects. We build tools like Ghost Browser to bypass network censorship, firewalls, and protect your digital privacy.",
        path: "/",
      })} />
      {/* Testimonials Review structured data (crawlers index reviews for rich snippets) */}
      <JsonLd data={testimonialsReviewSchema()} />





      {/* SCROLL DOTS */}
      <div className="scroll-dots">
        <div
          className={`scroll-dot ${activeSection === "hero" ? "active" : ""}`}
          onClick={() => scrollToSection("hero")}
        ></div>
        <div
          className={`scroll-dot ${activeSection === "projects" ? "active" : ""}`}
          onClick={() => scrollToSection("projects")}
        ></div>
        <div
          className={`scroll-dot ${activeSection === "future" ? "active" : ""}`}
          onClick={() => scrollToSection("future")}
        ></div>
      </div>

      {/* SPIDER */}
      <div id="thread-container" ref={threadContainerRef}>
        <div id="spider-wrap" ref={spiderWrapRef}>
          <Image
            src="/spider.png"
            id="spider-img"
            alt="spider hanging on web"
            width={120}
            height={320}
            priority
          />
        </div>
      </div>

      {/* HERO */}
      <section id="hero">
        <div className="hero-content">
          <span className="hero-eyebrow reveal" style={{ transitionDelay: "0s" }}>
            PRIVACY INFRASTRUCTURE
          </span>
          <h1 className="reveal" style={{ transitionDelay: "0.15s" }}>
            GHOST<br />PROJECTS<span>.</span>
          </h1>
          <p className="hero-sub reveal" style={{ transitionDelay: "0.3s" }}>
            We build tools that break barriers<br />and put privacy back in your hands.
          </p>
          <button
            className="scroll-cta reveal"
            style={{ transitionDelay: "0.45s" }}
            onClick={() => scrollToSection("projects")}
          >
            <span className="scroll-arrow"></span>
            SCROLL TO EXPLORE
          </button>
        </div>
        <div className="hero-video-wrap reveal" style={{ transitionDelay: "0.3s" }}>
          <video
            src="/main.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          />
        </div>
      </section>

      {/* PROJECTS */}
      <div className="divider"></div>
      <section className="product-section" id="projects">
        <div className="product-inner">
          <div className="reveal-left">
            <p className="product-label">
              <span></span>01 — GHOST BROWSER
            </p>
            <h2>GHOST<br />BROWSER</h2>
            <p className="product-tagline">THE INTERNET WITHOUT WALLS</p>
            <p className="product-desc">
              Ghost Browser automatically bypasses censorship, firewalls, and network restrictions. No VPN. No proxies. Just freedom.
            </p>
            <div className="btn-group">
              <Link href="/ghost-browser#download" className="btn-primary">DOWNLOAD NOW &nbsp;↗</Link>
              <Link href="/ghost-browser" className="btn-secondary">LEARN MORE &nbsp;→</Link>
            </div>
          </div>
          <div className="reveal-right">
            <div className="browser-mockup">
              <div className="browser-bar">
                <div className="browser-dots">
                  <span className="bd-r"></span>
                  <span className="bd-y"></span>
                  <span className="bd-g"></span>
                </div>
                <div className="browser-url">ghost://browser</div>
              </div>
              <div className="browser-body">
                <div className="browser-icon">
                  <svg width="52" height="32" viewBox="0 0 52 32" fill="none">
                    <ellipse cx="26" cy="16" rx="23" ry="14" stroke="#555" strokeWidth="1.5" />
                    <ellipse cx="26" cy="16" rx="8" ry="8" fill="#333" />
                    <line x1="3" y1="16" x2="9" y2="8" stroke="#555" strokeWidth="1.2" />
                    <line x1="49" y1="16" x2="43" y2="8" stroke="#555" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="browser-search">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="#555" strokeWidth="1.2" />
                    <line x1="8.5" y1="8.5" x2="11" y2="11" stroke="#555" strokeWidth="1.2" />
                  </svg>
                  Search the web freely...
                  <div className="browser-search-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DARKROOM */}
      <div className="divider"></div>
      <section className="product-section" id="darkroom">
        <div className="product-inner product-inner-alt">
          <div className="reveal-left">
            <p className="product-label">
              <span></span>02 — DARKROOM
            </p>
            <h2>DARKROOM</h2>
            <p className="product-tagline">VERY SECURE CHAT</p>
            <p className="product-desc">
              DarkRoom is a fully decentralized, peer-to-peer encrypted messaging network. No central servers, no phone numbers, and zero trace.
            </p>
            <div className="btn-group">
              <span className="coming-soon-badge">COMING SOON</span>
            </div>
          </div>
          <div className="reveal-right">
            <div className="chat-mockup">
              <div className="chat-bar">
                <div className="chat-dots">
                  <span className="cd-r"></span>
                  <span className="cd-y"></span>
                  <span className="cd-g"></span>
                </div>
                <div className="chat-title">darkroom://secure-chat</div>
              </div>
              <div className="chat-body">
                <div className="chat-message chat-msg-received">
                  <div className="chat-msg-avatar">A</div>
                  <div className="chat-msg-bubble">
                    <p>Is this connection secure?</p>
                    <span className="chat-msg-time">14:02</span>
                  </div>
                </div>
                <div className="chat-message chat-msg-sent">
                  <div className="chat-msg-bubble">
                    <p>Yes. Fully encrypted. Zero metadata logs.</p>
                    <span className="chat-msg-time">14:03</span>
                  </div>
                  <div className="chat-msg-avatar">B</div>
                </div>
                <div className="chat-message chat-msg-received">
                  <div className="chat-msg-avatar">A</div>
                  <div className="chat-msg-bubble">
                    <p>Excellent. Chat session self-destructs in 5m.</p>
                    <span className="chat-msg-time">14:03</span>
                  </div>
                </div>
                <div className="chat-input-area">
                  <div className="chat-input-placeholder">
                    <span className="lock-indicator">🔒 Encrypted session active...</span>
                  </div>
                  <div className="chat-send-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className="divider"></div>
      <section className="testimonials-section" id="testimonials">
        <div className="testimonials-inner">
          <div className="testimonials-header reveal">
            <span className="testimonials-eyebrow">TESTIMONIALS</span>
            <h2>WHAT USERS SAY<span>.</span></h2>
          </div>

          <div className="testimonials-grid reveal" style={{ transitionDelay: "0.2s" }}>
            {/* Card 1: Search-Bar Card */}
            <div className="bento-card bento-search bento-col-2">
              <div className="bento-search-header">
                <span className="bento-tag">Early Reviews</span>
                <span className="bento-status-dot"></span>
              </div>
              <div className="bento-search-bar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Search testimonials..." readOnly value={filter === "all" ? "privacy / speed" : filter} />
              </div>
              <div className="bento-filter-tags">
                <span
                  className={`filter-tag ${filter === "all" ? "active" : ""}`}
                  onClick={() => handleFilterChange("all")}
                >
                  All
                </span>
                <span
                  className={`filter-tag ${filter === "speed" ? "active" : ""}`}
                  onClick={() => handleFilterChange("speed")}
                >
                  Speed
                </span>
                <span
                  className={`filter-tag ${filter === "privacy" ? "active" : ""}`}
                  onClick={() => handleFilterChange("privacy")}
                >
                  Privacy
                </span>
              </div>
            </div>

            {/* Card 2: Stat Card */}
            <div className="bento-card bento-stat">
              <div className="bento-stat-header">
                <span className="bento-tag">Metrics</span>
              </div>
              <div className="bento-stat-value">0</div>
              <div className="bento-stat-title">Trackers &amp; Accounts</div>
              <p className="bento-stat-desc">Zero trackers, zero accounts. 100% privacy, keeping your data entirely offline.</p>
            </div>

            {/* Card 3: Testimonial 1 */}
            {renderTestimonialCard(standardReviews[0], "bento-t1")}

            {/* Card 4: Featured Testimonial (Large) */}
            {renderTestimonialCard(featuredReview)}

            {/* Card 5: Testimonial 2 */}
            {renderTestimonialCard(standardReviews[1], "bento-t2")}

            {/* Card 6: Testimonial 3 */}
            {renderTestimonialCard(standardReviews[2], "bento-t3")}

            {/* Card 7: Testimonial 4 (Quote Only) */}
            {renderTestimonialCard(standardReviews[3], "bento-t4")}

            {/* Card 8: Combined Avatar Stack & Download CTA */}
            <div className="bento-card bento-cta-combined">
              <div className="avatar-stack">
                <div className="avatar-ring stack-item"><div className="avatar-initials">EU</div></div>
                <div className="avatar-ring stack-item"><div className="avatar-initials">BT</div></div>
                <div className="avatar-ring stack-item"><div className="avatar-initials">EA</div></div>
              </div>
              <div className="bento-cta-combined-text">
                <h3>Try Ghost</h3>
                <p>Fast, secure browsing.</p>
              </div>
              <Link href="/ghost-browser#download" className="bento-cta-combined-btn">
                Download Now &nbsp;↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE */}
      <div className="divider"></div>
      <section className="future-section" id="future">
        <div className="future-inner">
          <div className="future-text reveal-left">
            <h2>MORE<br />TO COME</h2>
            <p>
              We&apos;re building more tools to protect your privacy, secure your data, and free the internet. Stay tuned.
            </p>
          </div>
          <div className="future-eye reveal">
            <video
              src="/eye_ball.mov"
              autoPlay
              loop
              muted
              playsInline
              className="future-eye-video"
            />
          </div>
          <div className="future-tagline reveal-right">
            <div className="lock-icon" role="img" aria-label="lock">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <p>
              <strong>THE FUTURE IS PRIVATE.</strong><br />THE FUTURE IS YOURS.
            </p>
          </div>
        </div>
      </section>


    </>
  );
}
