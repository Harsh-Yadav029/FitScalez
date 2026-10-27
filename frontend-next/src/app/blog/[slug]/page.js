import ClientView from "./ClientView";
import articlesData from "@/data/articles.json";

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const article = articlesData.find((a) => a.slug === slug);

    if (!article) {
        return {
            title: "Article Not Found | Fitscalez",
        };
    }

    return {
        title: `${article.title} | Fitscalez Insights`,
        description: article.metaDesc || article.summary,
        alternates: {
            canonical: `https://fitscalez.com/blog/${slug}`,
        },
        openGraph: {
            title: `${article.title} | Fitscalez Insights`,
            description: article.metaDesc || article.summary,
            url: `https://fitscalez.com/blog/${slug}`,
            type: "article",
        },
    };
}

export async function generateStaticParams() {
    return articlesData.map((article) => ({
        slug: article.slug,
    }));
}

export default async function BlogPostPage({ params }) {
    const resolvedParams = await params;
    return <ClientView initialSlug={resolvedParams?.slug} />;
}
