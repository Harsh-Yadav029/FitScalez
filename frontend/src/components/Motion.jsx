import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Spring transitions modeled after Apple HIG
export const appleSpring = {
    type: "spring",
    stiffness: 380,
    damping: 28,
};

export const softSpring = {
    type: "spring",
    stiffness: 240,
    damping: 24,
};

// Fade & Slide in view reveal
export const FadeIn = ({
    children,
    direction = "up",
    delay = 0,
    duration = 0.5,
    className = "",
    style = {},
    ...props
}) => {
    const directions = {
        up: { y: 24, x: 0 },
        down: { y: -24, x: 0 },
        left: { x: 28, y: 0 },
        right: { x: -28, y: 0 },
        none: { x: 0, y: 0 },
    };

    const offset = directions[direction] || directions.up;

    return (
        <motion.div
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
            style={style}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Container for staggering multiple motion children
export const StaggerContainer = ({
    children,
    delay = 0,
    staggerDelay = 0.08,
    className = "",
    style = {},
    ...props
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className={className}
            style={style}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({
    children,
    className = "",
    style = {},
    ...props
}) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className={className} style={style} {...props}>
            {children}
        </motion.div>
    );
};

// Apple Spotlight Glass Card with cursor-tracking gradient highlight
export const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(108, 99, 255, 0.15)",
    borderColor = "rgba(255, 255, 255, 0.12)",
    style = {},
    onClick,
    ...props
}) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePos({ x: -1000, y: -1000 });
            }}
            onClick={onClick}
            whileHover={{ y: -4, transition: appleSpring }}
            className={`spotlight-card ${className}`}
            style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                background: "rgba(18, 20, 29, 0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${isHovered ? borderColor : "rgba(255, 255, 255, 0.07)"}`,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                boxShadow: isHovered
                    ? "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(108, 99, 255, 0.12)"
                    : "0 10px 30px rgba(0, 0, 0, 0.3)",
                ...style,
            }}
            {...props}
        >
            {/* Dynamic Spotlight radial glow following cursor */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.25s ease",
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`,
                    zIndex: 1,
                }}
            />
            {/* Content Container */}
            <div style={{ position: "relative", zIndex: 2, height: "100%" }}>{children}</div>
        </motion.div>
    );
};

// Animated Number Counter
export const CountUp = ({ value, duration = 1.5, suffix = "", prefix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    // Extract numeric part
    const numericTarget = parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const totalSteps = 60;
        const stepTime = (duration * 1000) / totalSteps;
        const increment = numericTarget / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= numericTarget) {
                setCount(numericTarget);
                clearInterval(timer);
            } else {
                setCount(numericTarget % 1 === 0 ? Math.floor(start) : parseFloat(start.toFixed(1)));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, numericTarget, duration]);

    return (
        <span ref={ref}>
            {prefix}
            {count}
            {suffix}
        </span>
    );
};
