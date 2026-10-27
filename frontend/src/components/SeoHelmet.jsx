import React from "react";
import { Helmet } from "react-helmet-async";

const SeoHelmet = ({
    title = "Fitscalez — Web Development & Digital Marketing Agency",
    description = "Fitscalez delivers full-stack web development (MERN), digital marketing, SEO, and social media handling for businesses.",
    canonical,
    keywords,
    ogImage = "images/og-image.jpg",
    schema,
}) => {
    const siteUrl = "https://fitscalez.com";
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullCanonical} />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon.png" />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:image" content={`${siteUrl}/${ogImage}`} />
            <meta property="og:type" content="website" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}/${ogImage}`} />

            {/* Structured Schema */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SeoHelmet;
