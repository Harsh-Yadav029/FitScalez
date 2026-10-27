import Link from "next/link";

export const metadata = {
    title: "Terms of Service — Fitscalez | Web Development & Digital Marketing Agency Delhi",
    description: "Fitscalez Terms of Service: Terms and conditions governing the use of our website and engagement for web development and digital marketing services.",
    alternates: {
        canonical: "https://fitscalez.com/terms",
    },
};

export default function TermsPage() {
    return (
        <>
            <section className="page-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>›</span>
                        <span>Terms of Service</span>
                    </div>
                    <span className="badge" style={{ marginBottom: "16px" }}>Legal</span>
                    <h1>Terms of <span className="gradient-text">Service</span></h1>
                    <p>Terms and conditions governing your use of Fitscalez&apos;s services.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="legal-content animate-on-scroll" style={{ maxWidth: "860px", margin: "0 auto", lineHeight: "1.8" }}>
                        <span style={{ display: "inline-block", fontSize: "0.85rem", color: "var(--text-dim)", background: "rgba(108, 99, 255, 0.08)", border: "1px solid var(--border)", padding: "6px 16px", borderRadius: "50px", marginBottom: "30px" }}>
                            Last updated: September 26, 2026
                        </span>

                        <p>These Terms of Service (&quot;Terms&quot;) govern your use of the website <a href="https://fitscalez.com" style={{ color: "var(--primary-light)" }}>fitscalez.com</a> and all web development, digital marketing, SEO, and related services provided by <strong>Fitscalez</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), located at 24, Shri Ram Road, Civil Lines, Delhi - 110054, India. By using our website or engaging our services, you agree to these Terms.</p>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>1. Services Overview</h2>
                        <p>Fitscalez provides professional services including Full-stack web development (MERN Stack: MongoDB, Express.js, React.js, Node.js), Custom business website design, SEO, social media marketing, paid advertising (Google &amp; Meta Ads), and UI/UX design prototyping.</p>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>2. Pricing &amp; Payment Terms</h2>
                        <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                            <li>All prices are quoted in Indian Rupees (₹ INR) unless specified otherwise.</li>
                            <li>A <strong>50% advance payment</strong> is required before project development begins.</li>
                            <li>The remaining <strong>50% balance</strong> is payable upon project completion, before final deployment.</li>
                            <li>Payments can be made via UPI, bank transfer, Razorpay, or other agreed methods.</li>
                            <li>All payments are non-refundable once development has commenced.</li>
                        </ul>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>3. Intellectual Property</h2>
                        <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                            <li><strong>Client Ownership:</strong> Upon full payment, all custom-developed code, designs, and content created specifically for the client&apos;s project are transferred to the client.</li>
                            <li><strong>Fitscalez Ownership:</strong> Fitscalez retains the right to use general-purpose tools, frameworks, and reusable libraries developed internally.</li>
                            <li><strong>Portfolio Rights:</strong> Fitscalez reserves the right to showcase completed projects in our portfolio unless agreed otherwise in writing.</li>
                        </ul>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>4. Warranties &amp; Support</h2>
                        <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                            <li>Fitscalez warrants that all work will be performed professionally in accordance with modern industry standards.</li>
                            <li>We provide <strong>1 month of free post-launch support</strong> for bug fixes and adjustments after project delivery.</li>
                        </ul>

                        <h2 style={{ fontSize: "1.4rem", margin: "32px 0 12px" }}>5. Contact Information</h2>
                        <p>For inquiries regarding these Terms, contact us at:</p>
                        <p><strong>Fitscalez</strong><br />24, Shri Ram Road, Civil Lines, Delhi - 110054, India<br />Email: <a href="mailto:fitscalezofficial@gmail.com" style={{ color: "var(--primary-light)" }}>fitscalezofficial@gmail.com</a><br />Phone: <a href="tel:+919599433616" style={{ color: "var(--primary-light)" }}>+91 9599433616</a></p>
                    </div>
                </div>
            </section>
        </>
    );
}
