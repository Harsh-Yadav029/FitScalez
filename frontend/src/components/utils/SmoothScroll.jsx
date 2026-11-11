import React from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function LenisScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
