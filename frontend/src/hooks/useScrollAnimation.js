import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollAnimation = () => {
    const location = useLocation();

    useEffect(() => {
        // 1. Scroll-triggered animation observer
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll(".animate-on-scroll:not(.animated)");
            if (elements.length > 0) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add("animated");
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
                );

                elements.forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom >= 0) {
                        el.classList.add("animated");
                    } else {
                        observer.observe(el);
                    }
                });
            }

            // 2. Animated Counters
            const counters = document.querySelectorAll(".counter-number[data-target]");
            if (counters.length > 0) {
                const counterObserver = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const el = entry.target;
                                const target = parseInt(el.getAttribute("data-target"), 10);
                                const suffix = el.getAttribute("data-suffix") || "";
                                const duration = 1800;
                                const steps = duration / 16;
                                const stepVal = target / steps;
                                let current = 0;

                                const counterInterval = setInterval(() => {
                                    current += stepVal;
                                    if (current >= target) {
                                        current = target;
                                        clearInterval(counterInterval);
                                    }
                                    el.textContent = Math.floor(current) + suffix;
                                }, 16);

                                counterObserver.unobserve(el);
                            }
                        });
                    },
                    { threshold: 0.2 }
                );

                counters.forEach((c) => counterObserver.observe(c));
            }

            // 3. Subtle floating particles in hero
            const hero = document.querySelector(".hero");
            if (hero && !hero.dataset.particlesActive) {
                hero.dataset.particlesActive = "true";
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        const p = document.createElement("div");
                        p.className = "hero-particle";
                        p.style.cssText = `
                            position: absolute;
                            width: ${Math.random() * 3 + 2}px;
                            height: ${Math.random() * 3 + 2}px;
                            background: rgba(108, 99, 255, ${Math.random() * 0.4 + 0.3});
                            border-radius: 50%;
                            left: ${Math.random() * 95}%;
                            top: ${Math.random() * 95}%;
                            pointer-events: none;
                            animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
                            animation-delay: ${Math.random() * 4}s;
                            z-index: 1;
                        `;
                        hero.appendChild(p);
                    }, i * 300);
                }
            }
        }, 80);

        return () => clearTimeout(timer);
    }, [location.pathname]);
};
