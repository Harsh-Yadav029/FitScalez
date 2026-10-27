import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollAnimation = () => {
    const location = useLocation();

    useEffect(() => {
        let observer;
        let mutationObserver;

        const scanAndObserve = () => {
            const elements = document.querySelectorAll(".animate-on-scroll:not(.animated)");
            if (elements.length === 0) return;

            if (!observer) {
                observer = new IntersectionObserver(
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
            }

            const winH = window.innerHeight;
            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                // If already visible in the viewport, reveal immediately
                if (rect.top <= winH && rect.bottom >= 0) {
                    el.classList.add("animated");
                } else {
                    observer.observe(el);
                }
            });
        };

        // Scan after frame render
        const raf = requestAnimationFrame(() => {
            scanAndObserve();
        });

        // 2. Animated Counters
        const counters = document.querySelectorAll(".counter-number[data-target]");
        let counterObserver;
        if (counters.length > 0) {
            counterObserver = new IntersectionObserver(
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

        // 3. Watch for DOM mutations (e.g. tabs or dynamic filter changes)
        mutationObserver = new MutationObserver(() => {
            scanAndObserve();
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            cancelAnimationFrame(raf);
            if (observer) observer.disconnect();
            if (counterObserver) counterObserver.disconnect();
            if (mutationObserver) mutationObserver.disconnect();
        };
    }, [location.pathname]);
};
