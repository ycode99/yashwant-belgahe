"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Tag,
  BookOpen,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/vendors/ui/avatar";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/content";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Badge } from "@/vendors/ui/badge";
import { Card, CardHeader, CardTitle } from "@/vendors/ui/card";

interface Blogpost2Props {
  post: BlogPostData;
  prevPost?: BlogPostData | null;
  nextPost?: BlogPostData | null;
  relatedPosts?: BlogPostData[];
  className?: string;
}

const Blogpost2 = ({
  post,
  prevPost,
  nextPost,
  relatedPosts = [],
  className,
}: Blogpost2Props) => {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <ReadingProgress />

      <div className="container">
        <div className="relative flex flex-col justify-between gap-10 lg:flex-row items-stretch">
          {/* Sidebar */}
          <aside className="w-full lg:w-[300px] xl:w-[360px] space-y-6 shrink-0 self-stretch">
            <Link
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              href="/blog"
            >
              <ChevronLeft className="h-4 w-4" />
              Return to blog
            </Link>

            <div className="space-y-3">
              <Badge variant="secondary" className="gap-1 text-xs">
                <Tag size={12} /> {post.category}
              </Badge>

              <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Author & Meta Box */}
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/60">
              <Avatar className="size-9 rounded-full border">
                <AvatarImage
                  src="https://github.com/yashwant-belgahe.png"
                  alt="Yashwant Belgahe"
                />
                <AvatarFallback>YB</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <h2 className="font-semibold text-foreground">
                  Yashwant Belgahe
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky Table of Contents */}
            <div className="lg:sticky lg:top-20 lg:z-30">
              <TableOfContents
                headings={post.headings}
                articleTitle={post.title}
              />
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="flex-1 w-full max-w-4xl">
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="mt-0 mb-8 aspect-video w-full rounded-xl object-cover border shadow-sm"
              />
            )}

            <Card className="p-6 sm:p-10 border bg-card/80 backdrop-blur-sm shadow-sm mb-10">
              <div
                className="
                  prose dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
                  prose-h1:text-3xl prose-h1:border-b prose-h1:pb-3
                  prose-h2:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
                  prose-p:leading-relaxed prose-p:text-muted-foreground
                  prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80
                  [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:text-foreground [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:rounded [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-xs [&_:not(pre)>code]:border [&_:not(pre)>code]:before:content-none [&_:not(pre)>code]:after:content-none
                  [&_pre]:bg-zinc-950 [&_pre]:text-zinc-50 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-zinc-800/80 [&_pre]:overflow-x-auto [&_pre]:my-6
                  [&_pre_code]:bg-transparent [&_pre_code]:text-zinc-50 [&_pre_code]:p-0 [&_pre_code]:border-none [&_pre_code]:font-mono [&_pre_code]:text-xs [&_pre_code]:leading-relaxed [&_pre_code]:before:content-none [&_pre_code]:after:content-none
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                  prose-img:rounded-xl prose-img:shadow-md
                "
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </Card>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-10">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 border-t space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-primary" size={18} />
                  <h3 className="text-xl font-bold text-foreground">
                    Related Chronicles ({post.category})
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedPosts.map((relPost) => (
                    <Card
                      key={relPost.slug}
                      className="hover:border-primary/50 transition-all"
                    >
                      <CardHeader className="p-4 space-y-1.5">
                        <Badge
                          variant="secondary"
                          className="w-fit text-[10px]"
                        >
                          {relPost.category}
                        </Badge>
                        <CardTitle className="text-sm font-bold line-clamp-2 hover:text-primary transition-colors">
                          <Link href={`/blog/${relPost.slug}`}>
                            {relPost.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Previous & Next Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t">
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
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group text-right"
                >
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
          </article>
        </div>
      </div>
    </section>
  );
};

export { Blogpost2 };
