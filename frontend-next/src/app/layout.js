import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata = {
    metadataBase: new URL("https://fitscalez.com"),
    title: {
        default: "Fitscalez — Web Development & Digital Marketing Agency Delhi",
        template: "%s | Fitscalez",
    },
    description:
        "Fitscalez is Delhi's premier full-stack web development (MERN) and performance digital marketing agency. We build custom applications and generate high-ROI client pipelines.",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/images/favicon.png", type: "image/png", sizes: "32x32" },
            { url: "/images/favicon.png", type: "image/png", sizes: "16x16" },
        ],
        apple: [{ url: "/images/favicon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    openGraph: {
        title: "Fitscalez — Web Development & Digital Marketing Agency",
        description:
            "Fitscalez delivers full-stack web development (MERN), digital marketing, SEO, and social media handling for businesses.",
        url: "https://fitscalez.com",
        siteName: "Fitscalez",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Fitscalez Agency Preview",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Fitscalez — Web Development & Digital Marketing Agency",
        description:
            "Fitscalez delivers full-stack web development (MERN), digital marketing, SEO, and social media handling for businesses.",
        images: ["/images/og-image.jpg"],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Suspense fallback={null}>
                    <AnalyticsTracker />
                    <Navbar />
                </Suspense>
                <main>
                    <Suspense fallback={<div style={{ minHeight: "60vh" }}>Loading...</div>}>
                        {children}
                    </Suspense>
                </main>
                <Footer />
            </body>
        </html>
    );
}
