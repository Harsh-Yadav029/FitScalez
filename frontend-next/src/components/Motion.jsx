"use client";

import { motion } from "framer-motion";

// Apple-style spring physics config
export const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 24,
    mass: 0.8,
};

export const softSpring = {
    type: "spring",
    stiffness: 120,
    damping: 18,
};

// Fade up motion wrapper
export const FadeIn = ({ children, delay = 0, duration = 0.5, className = "", direction = "up" }) => {
    const yOffset = direction === "up" ? 28 : direction === "down" ? -28 : 0;
    const xOffset = direction === "left" ? 28 : direction === "right" ? -28 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset, x: xOffset }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Stagger container
export const StaggerContainer = ({ children, staggerDelay = 0.08, className = "" }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Stagger Item
export const StaggerItem = ({ children, className = "" }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Apple-style Card with subtle lift & interactive glow
export const MotionCard = ({ children, className = "", style = {}, onClick }) => {
    return (
        <motion.div
            whileHover={{
                y: -6,
                boxShadow: "0 24px 48px -12px rgba(108, 99, 255, 0.22), 0 0 0 1px rgba(139, 133, 255, 0.25)",
            }}
            whileTap={{ scale: 0.985 }}
            transition={softSpring}
            className={className}
            style={style}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

// Magnetic interactive button
export const MotionButton = ({ children, className = "", style = {}, onClick, disabled, type = "button" }) => {
    return (
        <motion.button
            type={type}
            disabled={disabled}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={className}
            style={style}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};
