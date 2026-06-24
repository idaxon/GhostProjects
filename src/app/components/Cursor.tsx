"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, { stiffness: 2000, damping: 120 });
  const y = useSpring(rawY, { stiffness: 2000, damping: 120 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setIsDesktop(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("a, button, [data-cursor], nav")) setHovering(true);
    };
    const onOut  = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("a, button, [data-cursor], nav")) setHovering(false);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        x,
        y,
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        userSelect: "none",
        transform: "translate(-50%, -50%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s ease",
      }}
      animate={{ scale: clicking ? 0.82 : hovering ? 1.25 : 1 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        style={{ display: "block", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}
      >
        <path
          d="M5 3 L19 11.5 L12.2 12.6 L9.6 19 Z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <motion.g
          stroke="#000000"
          strokeWidth="1.8"
          strokeLinecap="round"
          animate={{ opacity: clicking ? 1 : 0, scale: clicking ? 1 : 0.6 }}
          transition={{ duration: 0.12 }}
          style={{ transformOrigin: "16px 8px" }}
        >
          <line x1="20.5" y1="3.5" x2="22.5" y2="1.5" />
          <line x1="22.5" y1="8" x2="20" y2="8" />
          <line x1="20.5" y1="12.5" x2="22.5" y2="14.5" />
        </motion.g>
      </svg>
    </motion.div>
  );
}