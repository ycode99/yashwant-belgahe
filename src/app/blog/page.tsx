import React from "react";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { BlogList } from "@/components/blog/BlogList";

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Page Masthead Header */}
      <div className="space-y-4 text-center md:text-left border-b pb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Technical Blog & Chronicles
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
          Thoughts, guides, and practical tutorials on engineering scalable web applications, modern developer workflows, and system architecture.
        </p>
      </div>

      {/* Render Blog List with Search & Filtering */}
      <BlogList initialPosts={posts} />
    </div>
  );
}
