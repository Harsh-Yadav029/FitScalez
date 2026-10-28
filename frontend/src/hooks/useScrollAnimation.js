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
        const animateCounter = (el) => {
            if (el.getAttribute("data-counting")) return;
            el.setAttribute("data-counting", "true");
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
        };

        if (counters.length > 0) {
            counterObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            counterObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            const winH = window.innerHeight;
            counters.forEach((c) => {
                const rect = c.getBoundingClientRect();
                if (rect.top <= winH && rect.bottom >= 0) {
                    animateCounter(c);
                } else {
                    counterObserver.observe(c);
                }
            });
        }

        // 3. Progress Bars
        const progressBars = document.querySelectorAll(".progress-fill[data-width]");
        let progressObserver;
        const animateProgress = (el) => {
            if (el.getAttribute("data-filled")) return;
            el.setAttribute("data-filled", "true");
            const targetWidth = el.getAttribute("data-width");
            if (targetWidth) {
                setTimeout(() => {
                    el.style.width = targetWidth;
                }, 150);
            }
        };

        if (progressBars.length > 0) {
            progressObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animateProgress(entry.target);
                            progressObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            const winH = window.innerHeight;
            progressBars.forEach((p) => {
                p.style.width = "0%";
                const rect = p.getBoundingClientRect();
                if (rect.top <= winH && rect.bottom >= 0) {
                    animateProgress(p);
                } else {
                    progressObserver.observe(p);
                }
            });
        }

        // 4. Watch for DOM mutations (e.g. tabs or dynamic filter changes)
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
            if (progressObserver) progressObserver.disconnect();
            if (mutationObserver) mutationObserver.disconnect();
        };
    }, [location.pathname]);
};
