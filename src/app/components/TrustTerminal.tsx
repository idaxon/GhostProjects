"use client";

import { useState, useEffect, useRef } from "react";

type AnimationState = "idle" | "typing" | "resolved";

export default function TrustTerminal() {
  const [activeTab, setActiveTab] = useState<"windows" | "macos">("windows");
  const [animationState, setAnimationState] = useState<AnimationState>("idle");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [showPayoff, setShowPayoff] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const typingLines = [
    "> analyzing threat level...",
    "> threat level: none",
    "> reason: unrecognized publisher (we're new, that's it)",
    "> override protection? [y/n]",
    "> y"
  ];

  const macSteps = [
    "Open downloaded dmg (ghost-browser-1.1.0.dmg)",
    "Drag Ghost Browser to your Applications folder",
    "Attempt initial launch from Applications",
    "Close block/warning dialog if it appears",
    "Go to: System Settings ➔ Privacy & Security",
    "Scroll to the bottom section",
    "Click the \"Open Anyway\" button",
    "Relaunch Ghost Browser to complete setup"
  ];

  const winSteps = [
    "Double-click downloaded installer (ghost-browser-1.1.0-setup.exe)",
    "Click the \"More info\" link in the warning dialog",
    "Click the \"Run anyway\" button"
  ];

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Set initial state or reset when tab changes or viewport entered
  useEffect(() => {
    if (!hasEnteredViewport && !prefersReducedMotion) return;

    resetAnimation();
    
    // If reduced motion is preferred, immediately resolve
    if (prefersReducedMotion) {
      setTerminalVisible(true);
      setAnimationState("resolved");
      setShowPayoff(true);
      return;
    }

    // Set terminal visible and schedule typing start
    setTerminalVisible(true);
    
    const resetTimeout = setTimeout(() => {
      startTypingAnimation();
    }, 650); // Start typing after slide-left completes
    
    return () => {
      clearTimeout(resetTimeout);
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, [activeTab, hasEnteredViewport, prefersReducedMotion]);

  // Reset checkboxes when tab changes or resets
  useEffect(() => {
    const len = activeTab === "macos" ? macSteps.length : winSteps.length;
    setCompletedSteps(new Array(len).fill(false));
  }, [activeTab]);

  // Intersection Observer to trigger scroll visible state
  useEffect(() => {
    if (hasEnteredViewport || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEnteredViewport(true);
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% is visible
    );

    const current = containerRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [hasEnteredViewport, prefersReducedMotion]);

  const resetAnimation = () => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }
    setTerminalVisible(prefersReducedMotion);
    setAnimationState(prefersReducedMotion ? "resolved" : "idle");
    setTypedLines([]);
    setCurrentLineText("");
    setShowPayoff(prefersReducedMotion);
  };

  const startTypingAnimation = () => {
    setAnimationState("typing");
    setTypedLines([]);
    setCurrentLineText("");
    setShowPayoff(false);
    
    let lineIdx = 0;
    let charIdx = 0;
    
    const typeNextChar = () => {
      if (lineIdx >= typingLines.length) {
        // Complete! Wait a moment before resolving to steps
        animationTimerRef.current = setTimeout(() => {
          setAnimationState("resolved");
          // Smooth fade in for payoff
          animationTimerRef.current = setTimeout(() => {
            setShowPayoff(true);
          }, 200);
        }, 600);
        return;
      }

      const currentLineFull = typingLines[lineIdx];
      
      if (charIdx < currentLineFull.length) {
        setCurrentLineText(currentLineFull.substring(0, charIdx + 1));
        charIdx++;
        
        // Dynamic typing speed: slightly faster/slower
        let speed = 40 + Math.random() * 30;
        if (currentLineFull[charIdx - 1] === "." || currentLineFull[charIdx - 1] === ":") {
          speed = 250; // pause on punctuation
        }
        
        animationTimerRef.current = setTimeout(typeNextChar, speed);
      } else {
        // Line complete, add to finished lines
        setTypedLines((prev) => [...prev, currentLineFull]);
        setCurrentLineText("");
        lineIdx++;
        charIdx = 0;
        
        // Wait briefly before typing the next line
        animationTimerRef.current = setTimeout(typeNextChar, 350);
      }
    };

    animationTimerRef.current = setTimeout(typeNextChar, 100);
  };

  const handleBypassClick = () => {
    if (animationState !== "resolved") {
      // Force bypass immediately
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
      setTerminalVisible(true);
      setAnimationState("resolved");
      setShowPayoff(true);
    }
  };

  const toggleStep = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dialog click bypass from firing
    setCompletedSteps((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <section className="detail-section" ref={containerRef} id="trust-terminal-section">
      <div className="card text-card trust-card">
        {/* SECTION HEADER */}
        <div className="trust-section-header">
          <span className="trust-eyebrow">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            🛡️ Relax. It&apos;s Safe.
          </span>
          <p className="trust-intro">
            Windows and macOS might act like you&apos;ve just downloaded a supervillain&apos;s secret project. You didn&apos;t. Ghost Browser is safe to download from our official website. Your operating system is simply being extra protective because we&apos;re the new kid on the block — not because the app is dangerous.
          </p>
        </div>

        {/* TABS CONTROLLER */}
        <div className="trust-tabs-wrapper" role="tablist" aria-label="Operating System Guides">
          <button
            className={`trust-tab-btn ${activeTab === "windows" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "windows"}
            aria-controls="windows-tab-panel"
            id="windows-tab"
            onClick={() => setActiveTab("windows")}
          >
            WINDOWS
          </button>
          <button
            className={`trust-tab-btn ${activeTab === "macos" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "macos"}
            aria-controls="macos-tab-panel"
            id="macos-tab"
            onClick={() => setActiveTab("macos")}
          >
            MACOS
          </button>
        </div>

        {/* TAB PANELS CONTAINER */}
        <div className={`trust-grid-container ${animationState === "resolved" ? "resolved-layout" : ""}`} onClick={handleBypassClick}>
          {/* DIALOG COL (kept always visible, grayscale bypassed when resolved) */}
          <div className="dialog-column">
            {activeTab === "windows" && (
              <div 
                id="windows-tab-panel" 
                role="tabpanel" 
                aria-labelledby="windows-tab"
                className={`windows-dialog-frame ${animationState === "resolved" ? "bypassed" : ""}`}
              >
                {/* Windows Chrome header */}
                <div className="dialog-chrome-win">
                  <span className="dialog-title-win">Windows Defender SmartScreen</span>
                  <div className="dialog-win-controls">
                    <span className="win-btn-min"></span>
                    <span className="win-btn-max"></span>
                    <span className="win-btn-close">✕</span>
                  </div>
                </div>
                {/* Dialog Content */}
                <div className="dialog-body-win">
                  <div className="win-icon-column">
                    <div className="win-shield-svg-wrapper">
                      {/* Shield Outline with Ghost inside */}
                      <svg viewBox="0 0 64 64" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-shield">
                        <path d="M12 4c12 0 20-2 20-2s8 2 20 2v24c0 14-20 28-20 28S12 42 12 28V4z" fill="#080808" />
                        <path d="M32 14c-5 0-9 4-9 9v12c0 2 1 3 3 3s3-1 3-3V26c0-1 1-2 2-2s2 1 2 2v9c0 2 1 3 3 3s3-1 3-3V23c0-5-4-9-9-9z" />
                        <circle cx="29" cy="20" r="1.5" fill="var(--color-accent)" />
                        <circle cx="35" cy="20" r="1.5" fill="var(--color-accent)" />
                      </svg>
                    </div>
                  </div>
                  <div className="win-text-column">
                    <h3 className="win-headline">Windows protected your PC</h3>
                    <p className="win-descr">
                      Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC at risk.
                    </p>
                    <div className="win-links-row">
                      <span className="win-more-info-link">More info</span>
                    </div>
                  </div>
                </div>
                {/* Dialog Footer Actions */}
                <div className="dialog-footer-win">
                  <button className="win-action-btn primary disabled" disabled>
                    Don&apos;t run
                  </button>
                </div>
              </div>
            )}

            {activeTab === "macos" && (
              <div 
                id="macos-tab-panel" 
                role="tabpanel" 
                aria-labelledby="macos-tab"
                className={`macos-dialog-frame ${animationState === "resolved" ? "bypassed" : ""}`}
              >
                {/* macOS Chrome Header */}
                <div className="dialog-chrome-mac">
                  <div className="mac-dots">
                    <span className="mac-dot red"></span>
                    <span className="mac-dot yellow"></span>
                    <span className="mac-dot green"></span>
                  </div>
                </div>
                {/* Dialog Content */}
                <div className="dialog-body-mac">
                  <div className="mac-app-icon-wrapper">
                    {/* App icon block with simplified eye logo */}
                    <svg viewBox="0 0 64 64" fill="none" className="svg-mac-app">
                      <rect x="6" y="6" width="52" height="52" rx="12" fill="#050505" stroke="var(--color-accent)" strokeWidth="2" />
                      <ellipse cx="32" cy="32" rx="14" ry="8" stroke="var(--color-text-primary)" strokeWidth="2" />
                      <circle cx="32" cy="32" r="4.5" fill="var(--color-accent)" />
                    </svg>
                  </div>
                  <h3 className="mac-headline">“Ghost Browser” can’t be opened because it is from an unidentified developer.</h3>
                  <p className="mac-descr">
                    macOS cannot verify that this app is free from malware.
                  </p>
                </div>
                {/* Dialog Footer Actions */}
                <div className="dialog-footer-mac">
                  <button className="mac-action-btn secondary">Move to Bin</button>
                  <button className="mac-action-btn primary disabled" disabled>OK</button>
                </div>
              </div>
            )}

            {/* Aside text styled specifically as an italic crimson commentary line */}
            <div className="aside-comment-wrapper">
              {activeTab === "windows" ? (
                <p className="aside-comment-text">Aww... thanks, Windows. Very caring.</p>
              ) : (
                <p className="aside-comment-text">Move to Bin? We aren&apos;t rubbish, Apple...</p>
              )}
            </div>
          </div>

          {/* STEPS COL (appears next to dialog and terminal when resolved) */}
          {animationState === "resolved" && (
            <div className="resolved-steps-column animate-fade-in">
              <div className="resolved-steps-container">
                {activeTab === "macos" ? (
                  macSteps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`terminal-step ${completedSteps[idx] ? "completed" : ""}`}
                      onClick={(e) => toggleStep(idx, e)}
                    >
                      <span className="step-check">{completedSteps[idx] ? "[✓]" : "[ ]"}</span>
                      <span className="step-prefix">STEP {idx + 1}:</span>
                      <span className="step-text">{step}</span>
                    </div>
                  ))
                ) : (
                  winSteps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`terminal-step ${completedSteps[idx] ? "completed" : ""}`}
                      onClick={(e) => toggleStep(idx, e)}
                    >
                      <span className="step-check">{completedSteps[idx] ? "[✓]" : "[ ]"}</span>
                      <span className="step-prefix">STEP {idx + 1}:</span>
                      <span className="step-text">{step}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TERMINAL COL */}
          <div 
            className={`terminal-column ${terminalVisible ? "visible" : ""}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="terminal-inner">
              <div className="terminal-chrome">
                <span className="terminal-dot"></span>
                <span className="terminal-dot"></span>
                <span className="terminal-dot"></span>
                <span className="terminal-title">ghost-override-terminal.sh</span>
              </div>
              
              <div className="terminal-content">
                {/* Finished lines */}
                {typedLines.map((line, idx) => (
                  <div key={idx} className="terminal-line typed">{line}</div>
                ))}
                
                {/* Currently typing line */}
                {animationState === "typing" && (
                  <div className="terminal-line typing">
                    {currentLineText}
                    <span className="blinking-cursor">▍</span>
                  </div>
                )}

                {/* Idle prompt waiting */}
                {animationState === "idle" && (
                  <div className="terminal-line idle">
                    <span className="terminal-prompt">&gt;</span>
                    <span className="blinking-cursor">▍</span>
                  </div>
                )}

                {/* Resolved Steps */}
                {animationState === "resolved" && (
                  <div className="resolved-steps-terminal animate-fade-in">
                    <div className="terminal-line output">&gt; bypass sequence: AUTHORIZED</div>
                    <div className="terminal-line output">&gt; system protection: OVERRIDDEN</div>
                    <div className="terminal-line output">&gt; install checklist loaded.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PAYOFF & EXPLAINER BLOCK */}
        {showPayoff && (
          <div className="trust-payoff-wrapper animate-fade-in">
            {/* Payoff line */}
            <p className="payoff-message">
              {activeTab === "windows" 
                ? "Congratulations. You've successfully convinced Windows that you know what you're doing."
                : "Apple has now accepted that you're an adult capable of making your own decisions."
              }
            </p>
            
            {/* Explainer Block */}
            <div className="explainer-block">
              <h4 className="explainer-title">Why is this happening?</h4>
              <p className="explainer-body">
                Because Ghost Browser is new. Windows and macOS don&apos;t instantly trust every new app on the internet — even legitimate ones. They build trust over time. So the warning is basically your computer saying: &ldquo;I&apos;ve never met this browser before... are we sure?&rdquo; Yes. We&apos;re sure. Thanks for checking, though. <span className="heart-icon">❤️</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
