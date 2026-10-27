import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const PageProgressBar = () => {
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Start progress immediately on route change
        setLoading(true);
        setProgress(30);

        const t1 = setTimeout(() => {
            setProgress(75);
        }, 80);

        const t2 = setTimeout(() => {
            setProgress(100);
        }, 220);

        const t3 = setTimeout(() => {
            setLoading(false);
            setProgress(0);
        }, 450);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [pathname]);

    return (
        <AnimatePresence>
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        zIndex: 99999,
                        pointerEvents: "none",
                        background: "transparent",
                    }}
                >
                    <motion.div
                        style={{
                            height: "100%",
                            background: "linear-gradient(90deg, #6C63FF 0%, #00E599 50%, #38BDF8 100%)",
                            boxShadow: "0 0 12px 1px rgba(0, 229, 153, 0.7), 0 0 24px 2px rgba(108, 99, 255, 0.5)",
                            borderRadius: "0 4px 4px 0",
                        }}
                        initial={{ width: "0%", opacity: 1 }}
                        animate={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            width: { duration: 0.25, ease: "easeOut" },
                            opacity: { duration: 0.2, ease: "easeIn" },
                        }}
                    />
                </div>
            )}
        </AnimatePresence>
    );
};

export default PageProgressBar;
