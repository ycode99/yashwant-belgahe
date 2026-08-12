import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts, getRelatedBlogPosts } from "@/lib/content";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Badge } from "@/vendors/ui/badge";
import { buttonVariants } from "@/vendors/ui/button";
import { Card, CardHeader, CardTitle } from "@/vendors/ui/card";
import { cn } from "@/lib/utils";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const rawDescription = post.description || post.title;
  const description =
    rawDescription.length > 155 ? `${rawDescription.slice(0, 152)}...` : rawDescription;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const relatedPosts = getRelatedBlogPosts(slug, post.category, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Yashwant Belgahe",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${post.slug}`,
    },
    keywords: [post.category, ...post.tags].join(", "),
  };

  return (
    <div className="min-h-screen pb-16 pt-8 bg-background relative">
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Navigation Button */}
        <div>
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-lg gap-1.5")}
          >
            <ArrowLeft size={14} /> Back to Blog Archives
          </Link>
        </div>

        {/* Hero Masthead Card */}
        <Card className="overflow-hidden border bg-gradient-to-b from-card to-muted/20 shadow-md">
          {post.coverImage && (
            <div className="relative w-full h-64 sm:h-96 overflow-hidden bg-muted">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
          )}

          <CardHeader className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-medium text-muted-foreground">
              <Badge variant="secondary" className="gap-1 px-3 py-1 text-xs">
                <Tag size={12} /> {post.category}
              </Badge>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {post.readTime}
                </span>
              </div>
            </div>

            <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {post.title}
            </CardTitle>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Article Markdown Body */}
          <main className="lg:col-span-8 order-2 lg:order-1">
            <Card className="p-6 sm:p-10 border bg-card/80 backdrop-blur-sm shadow-sm">
              <div
                className="
                  prose dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
                  prose-h1:text-3xl prose-h1:border-b prose-h1:pb-3
                  prose-h2:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
                  prose-p:leading-relaxed prose-p:text-muted-foreground
                  prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80
                  prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs
                  prose-pre:bg-zinc-950 prose-pre:text-zinc-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:border
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                  prose-img:rounded-xl prose-img:shadow-md
                "
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </Card>
          </main>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 order-1 lg:order-2 sticky top-24">
            <TableOfContents headings={post.headings} articleTitle={post.title} />
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t space-y-6">
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary" size={20} />
              <h3 className="text-2xl font-bold text-foreground">
                Related Articles in {post.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <Card key={relPost.slug} className="hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="p-4 space-y-2">
                    <Badge variant="secondary" className="w-fit text-[10px]">
                      {relPost.category}
                    </Badge>
                    <CardTitle className="text-base font-bold line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${relPost.slug}`}>{relPost.title}</Link>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {relPost.description}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Previous & Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group">
              <Card className="p-4 hover:border-primary/50 transition-all">
                <span className="text-xs font-medium text-primary flex items-center gap-1 mb-1">
                  <ChevronLeft size={14} /> Previous Story
                </span>
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {prevPost.title}
                </span>
              </Card>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group text-right">
              <Card className="p-4 hover:border-primary/50 transition-all">
                <span className="text-xs font-medium text-primary flex items-center justify-end gap-1 mb-1">
                  Next Story <ChevronRight size={14} />
                </span>
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {nextPost.title}
                </span>
              </Card>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
