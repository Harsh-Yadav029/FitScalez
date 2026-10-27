import Link from "next/link";

export const metadata = {
    title: "Privacy Policy — Fitscalez | Web Development & Digital Marketing Agency Delhi",
    description: "Fitscalez Privacy Policy: How we collect, use, and protect your personal information when using our website and services.",
    alternates: {
        canonical: "https://fitscalez.com/privacy",
    },
};

export default function PrivacyPage() {
    return (
        <>
            <section className="page-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>›</span>
                        <span>Privacy Policy</span>
                    </div>
                    <span className="badge" style={{ marginBottom: "16px" }}>Legal</span>
                    <h1>Privacy <span className="gradient-text">Policy</span></h1>
                    <p>How Fitscalez collects, uses, and protects your personal information.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="legal-content animate-on-scroll" style={{ maxWidth: "860px", margin: "0 auto", lineHeight: "1.8" }}>
                        <span style={{ display: "inline-block", fontSize: "0.85rem", color: "var(--text-dim)", background: "rgba(108, 99, 255, 0.08)", border: "1px solid var(--border)", padding: "6px 16px", borderRadius: "50px", marginBottom: "30px" }}>
                            Last updated: September 26, 2026
                        </span>

                        <p>At <strong>Fitscalez</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, store, and share information when you visit our website <a href="https://fitscalez.com" style={{ color: "var(--primary-light)" }}>fitscalez.com</a> or engage with our web development and digital marketing services.</p>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>1. Information We Collect</h2>
                        <h3 style={{ fontSize: "1.1rem", margin: "16px 0 8px", color: "var(--primary-light)" }}>Personal Information You Provide</h3>
                        <p>When you contact us, request a quote, or engage our services, we may collect:</p>
                        <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                            <li>Full name and business name</li>
                            <li>Email address</li>
                            <li>Phone number / WhatsApp number</li>
                            <li>Business website URL</li>
                            <li>Project requirements and budget details</li>
                            <li>Billing and payment information (processed securely via Razorpay)</li>
                        </ul>

                        <h3 style={{ fontSize: "1.1rem", margin: "16px 0 8px", color: "var(--primary-light)" }}>Information Collected Automatically</h3>
                        <p>When you visit our website, we may automatically collect:</p>
                        <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                            <li>IP address and approximate location</li>
                            <li>Browser type and version</li>
                            <li>Device type and operating system</li>
                            <li>Pages visited, time spent, and navigation paths</li>
                            <li>Referring website or search query</li>
                        </ul>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>2. How We Use Your Information</h2>
                        <p>We use the information we collect for the following purposes:</p>
                        <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                            <li><strong>Service Delivery:</strong> To create, develop, and deliver web development, SEO, and digital marketing projects you have requested.</li>
                            <li><strong>Communication:</strong> To respond to your inquiries, provide quotes, send project updates, and coordinate via email, phone, or WhatsApp.</li>
                            <li><strong>Improvement:</strong> To analyze website usage and improve our site&apos;s performance, user experience, and content.</li>
                            <li><strong>Marketing:</strong> To send you relevant updates, tips, or offers related to our services (only with your consent; you may opt out at any time).</li>
                            <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
                        </ul>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>3. Cookies &amp; Tracking Technologies</h2>
                        <p>Our website may use cookies and similar technologies (such as Google Analytics) to understand how visitors interact with our site. These help us:</p>
                        <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                            <li>Remember your preferences</li>
                            <li>Analyze traffic sources and page performance</li>
                            <li>Improve content and user experience</li>
                        </ul>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>4. Third-Party Services</h2>
                        <p>We may share limited data with trusted third-party service providers who assist us in operating our website and delivering services, including Google Analytics, Razorpay, and WhatsApp Business.</p>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>5. Data Security</h2>
                        <p>We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include HTTPS encryption across our entire website, secure password hashing, and restricted access controls.</p>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>6. Contact Us</h2>
                        <p>If you have questions about this Privacy Policy, please contact us at:</p>
                        <p><strong>Fitscalez</strong><br />24, Shri Ram Road, Civil Lines, Delhi - 110054, India<br />Email: <a href="mailto:fitscalezofficial@gmail.com" style={{ color: "var(--primary-light)" }}>fitscalezofficial@gmail.com</a><br />Phone: <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>+91 9599433616</a></p>
                    </div>
                </div>
            </section>
        </>
    );
}
