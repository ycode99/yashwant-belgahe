import React from "react";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { Blog27 } from "@/components/section/blog27";

export const metadata: Metadata = {
  title: "Blog & Technical Chronicles — Yashwant Belgahe",
  description:
    "Explore in-depth articles on Full Stack Development, Git Workflows, Next.js, System Architecture, and Software Engineering by Yashwant Belgahe.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Technical Chronicles — Yashwant Belgahe",
    description:
      "Explore in-depth articles on Full Stack Development, Git Workflows, Next.js, System Architecture, and Software Engineering by Yashwant Belgahe.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog & Technical Chronicles",
    description:
      "Engineering articles and software architecture guides by Yashwant Belgahe.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Blog27 posts={posts} />
    </>
  );
}
