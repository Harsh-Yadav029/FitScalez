import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const ringWrapperRef = useRef(null);
  const ringVisualRef = useRef(null);
  const dotWrapperRef = useRef(null);
  const dotVisualRef = useRef(null);

  useEffect(() => {
    const ringWrapper = ringWrapperRef.current;
    const ringVisual = ringVisualRef.current;
    const dotWrapper = dotWrapperRef.current;
    const dotVisual = dotVisualRef.current;

    if (!ringWrapper || !ringVisual || !dotWrapper || !dotVisual || typeof window === "undefined") {
      return undefined;
    }

    // Only enable on devices with a fine pointer (desktop / laptop mouse or precision trackpad)
    const supportsFinePointer =
      window.matchMedia && window.matchMedia("(pointer: fine)").matches;

    if (!supportsFinePointer) {
      ringWrapper.style.display = "none";
      dotWrapper.style.display = "none";
      return undefined;
    }

    let hasMoved = false;
    let isHovering = false;
    let isOverText = false;

    // Interactive target selector covering all clickable/actionable elements
    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, summary, .hover-this, .hover-brown, .cursor-pointer, [data-cursor]";
    const textInputSelector =
      "input[type='text'], input[type='email'], input[type='password'], input[type='search'], input[type='number'], textarea, [contenteditable='true']";

    // Set initial position off-screen and invisible until first mouse move
    gsap.set([ringWrapper, dotWrapper], {
      x: -100,
      y: -100,
      opacity: 0,
      pointerEvents: "none",
    });

    // Quick setters for ultra-smooth 60fps tracking on wrappers ONLY
    const xDot = gsap.quickTo(dotWrapper, "x", { duration: 0.04, ease: "power3.out" });
    const yDot = gsap.quickTo(dotWrapper, "y", { duration: 0.04, ease: "power3.out" });
    const xRing = gsap.quickTo(ringWrapper, "x", { duration: 0.18, ease: "power2.out" });
    const yRing = gsap.quickTo(ringWrapper, "y", { duration: 0.18, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      if (!hasMoved) {
        hasMoved = true;
        // Snap immediately to mouse position without lag on first movement
        gsap.set(dotWrapper, { x: clientX, y: clientY, opacity: 1 });
        gsap.set(ringWrapper, { x: clientX, y: clientY, opacity: 1 });
      }

      xDot(clientX);
      yDot(clientY);
      xRing(clientX);
      yRing(clientY);
    };

    const handleInteractiveEnter = (isText) => {
      isHovering = true;
      isOverText = isText;

      if (isText) {
        // Subtle fade over text inputs so the native text caret remains fully legible
        gsap.to(ringVisual, {
          duration: 0.2,
          scale: 0.6,
          opacity: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dotVisual, {
          duration: 0.2,
          scale: 0.7,
          opacity: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        // High-contrast interactive hover state
        gsap.to(ringVisual, {
          duration: 0.24,
          scale: 1.65,
          opacity: 1,
          borderColor: "#BF4A1A",
          backgroundColor: "rgba(191, 74, 26, 0.2)",
          boxShadow:
            "0 0 14px rgba(191, 74, 26, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.65)",
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dotVisual, {
          duration: 0.2,
          scale: 1.25,
          opacity: 1,
          backgroundColor: "#BF4A1A",
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleInteractiveLeave = () => {
      isHovering = false;
      isOverText = false;

      gsap.to(ringVisual, {
        duration: 0.24,
        scale: 1,
        opacity: 1,
        borderColor: "rgba(191, 74, 26, 0.75)",
        backgroundColor: "transparent",
        boxShadow:
          "0 0 8px rgba(191, 74, 26, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.35)",
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(dotVisual, {
        duration: 0.2,
        scale: 1,
        opacity: 1,
        backgroundColor: "#BF4A1A",
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseDown = () => {
      gsap.to(ringVisual, {
        scale: isHovering && !isOverText ? 1.35 : 0.8,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(dotVisual, {
        scale: 0.7,
        duration: 0.1,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseUp = () => {
      gsap.to(ringVisual, {
        scale: isHovering && !isOverText ? 1.65 : 1,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(dotVisual, {
        scale: isHovering && !isOverText ? 1.25 : 1,
        duration: 0.14,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handlePointerOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isText = Boolean(target.closest?.(textInputSelector));
      const isInteractive = isText || Boolean(target.closest?.(interactiveSelector));

      if (isInteractive) {
        handleInteractiveEnter(isText);
      }
    };

    const handlePointerOut = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest?.(interactiveSelector)) {
        if (e.relatedTarget?.closest?.(interactiveSelector)) return;
        handleInteractiveLeave();
      }
    };

    const handleMouseLeaveWindow = () => {
      gsap.to([ringWrapper, dotWrapper], {
        opacity: 0,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    const handleMouseEnterWindow = () => {
      if (hasMoved) {
        gsap.to([ringWrapper, dotWrapper], {
          opacity: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, []);

  return (
    <>
      {/* Outer Magnetic Follow Ring Wrapper (handles coordinate tracking) */}
      <div
        ref={ringWrapperRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99998] will-change-transform md:block hidden"
        style={{
          width: 0,
          height: 0,
          opacity: 0,
        }}
      >
        {/* Ring Visual (always exactly 100% concentric via translate(-50%, -50%)) */}
        <div
          ref={ringVisualRef}
          className="rounded-full border pointer-events-none transition-colors will-change-transform"
          style={{
            width: 36,
            height: 36,
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(191, 74, 26, 0.75)",
            boxShadow:
              "0 0 8px rgba(191, 74, 26, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.35)",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* Inner Precision Lead Dot Wrapper (handles coordinate tracking) */}
      <div
        ref={dotWrapperRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform md:block hidden"
        style={{
          width: 0,
          height: 0,
          opacity: 0,
        }}
      >
        {/* Dot Visual (always exactly 100% concentric via translate(-50%, -50%)) */}
        <div
          ref={dotVisualRef}
          className="rounded-full pointer-events-none will-change-transform"
          style={{
            width: 8,
            height: 8,
            transform: "translate(-50%, -50%)",
            backgroundColor: "#BF4A1A",
            boxShadow:
              "0 0 8px rgba(191, 74, 26, 0.8), 0 0 0 1.5px #FFFFFF",
          }}
        />
      </div>
    </>
  );
};

export default Cursor;
