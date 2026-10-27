import React from "react";

// Modern shimmering skeleton box
export const Skeleton = ({ width = "100%", height = "20px", borderRadius = "8px", style = {}, className = "" }) => (
    <div
        className={`skeleton-shimmer ${className}`}
        style={{
            width,
            height,
            borderRadius,
            background: "linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.09) 50%, rgba(255, 255, 255, 0.03) 100%)",
            backgroundSize: "200% 100%",
            animation: "skeletonShimmer 1.6s ease-in-out infinite",
            ...style,
        }}
    />
);

// High-end article loading skeleton
export const ArticleSkeleton = () => (
    <div style={{ maxWidth: "860px", margin: "140px auto 60px", padding: "0 24px" }}>
        <Skeleton width="120px" height="24px" borderRadius="100px" style={{ marginBottom: "20px" }} />
        <Skeleton width="90%" height="48px" borderRadius="12px" style={{ marginBottom: "16px" }} />
        <Skeleton width="60%" height="48px" borderRadius="12px" style={{ marginBottom: "28px" }} />
        
        <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "36px" }}>
            <Skeleton width="44px" height="44px" borderRadius="50%" />
            <div>
                <Skeleton width="140px" height="16px" borderRadius="6px" style={{ marginBottom: "6px" }} />
                <Skeleton width="100px" height="12px" borderRadius="6px" />
            </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Skeleton width="100%" height="18px" borderRadius="6px" />
            <Skeleton width="96%" height="18px" borderRadius="6px" />
            <Skeleton width="92%" height="18px" borderRadius="6px" />
            <Skeleton width="88%" height="18px" borderRadius="6px" />
            <Skeleton width="100%" height="240px" borderRadius="20px" style={{ margin: "24px 0" }} />
            <Skeleton width="98%" height="18px" borderRadius="6px" />
            <Skeleton width="94%" height="18px" borderRadius="6px" />
        </div>
    </div>
);

// Branded loading spinner with glowing aura
export const BrandedSpinner = ({ message = "Loading..." }) => (
    <div
        style={{
            minHeight: "75vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            textAlign: "center",
            padding: "40px 20px",
        }}
    >
        <div style={{ position: "relative", width: "56px", height: "56px" }}>
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: "3px solid rgba(255, 255, 255, 0.08)",
                    borderTopColor: "var(--emerald)",
                    borderRightColor: "var(--primary-light)",
                    animation: "spinnerRotate 0.8s linear infinite",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: "6px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0, 229, 153, 0.25) 0%, transparent 70%)",
                    filter: "blur(4px)",
                }}
            />
        </div>

        <div style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 500, letterSpacing: "0.02em" }}>
            {message}
        </div>
    </div>
);

export default Skeleton;
