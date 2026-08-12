"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPostData } from "@/lib/content";
import { Search, Calendar, Clock, ArrowRight, Tag, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/vendors/ui/card";
import { Badge } from "@/vendors/ui/badge";
import { Button, buttonVariants } from "@/vendors/ui/button";
import { Input } from "@/vendors/ui/input";
import { cn } from "@/lib/utils";

interface BlogListProps {
  initialPosts: BlogPostData[];
}

export function BlogList({ initialPosts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  // Aggregate available categories dynamically
  const categories = useMemo(() => {
    const list = new Set<string>();
    initialPosts.forEach((p) => {
      if (p.category) list.add(p.category.toUpperCase());
    });
    return ["ALL", ...Array.from(list)];
  }, [initialPosts]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Filter posts by search query & category
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "ALL" ||
        post.category.toUpperCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const listPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
  }, [filteredPosts, featuredPost]);

  const totalPages = Math.ceil(listPosts.length / POSTS_PER_PAGE);
  const paginatedListPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return listPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [listPosts, currentPage]);

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-xl border bg-card/60 backdrop-blur-md shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles or tags..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 bg-background/80 text-sm focus-visible:ring-1"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(cat)}
              className="text-xs rounded-full px-3 py-1 transition-all"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="flex flex-col gap-10">
          {/* Featured Hero Article */}
          {featuredPost && currentPage === 1 && (
            <Card className="overflow-hidden border bg-gradient-to-br from-card via-card to-muted/30 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Cover Image / Visual Container */}
                <div className="lg:col-span-6 relative aspect-video w-full overflow-hidden bg-muted group">
                  {featuredPost.coverImage ? (
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
                      <Sparkles size={48} className="opacity-40" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-primary text-primary-foreground flex items-center gap-1 text-xs px-2.5 py-1 shadow">
                      <Sparkles size={12} /> Featured Article
                    </Badge>
                  </div>
                </div>

                {/* Content Container */}
                <div className="lg:col-span-6 p-6 lg:p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} /> {featuredPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} /> {featuredPost.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground hover:text-primary transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 my-1">
                    {featuredPost.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[11px]">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className="text-xs uppercase font-semibold">
                      <Tag size={12} className="mr-1 inline" /> {featuredPost.category}
                    </Badge>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className={cn(buttonVariants({ variant: "default", size: "sm" }), "rounded-lg gap-1.5")}
                    >
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Regular Posts Grid */}
          {paginatedListPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedListPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="flex flex-col h-full overflow-hidden border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
                >
                  {/* Aspect Ratio Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted border-b">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                        <Sparkles size={32} className="opacity-30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-[10px] uppercase font-semibold bg-background/80 backdrop-blur-md">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="p-5 pb-2">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium mb-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>

                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-5 pt-0 flex-grow">
                    <CardDescription className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] text-muted-foreground/80 bg-muted/60 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 pt-0 border-t mt-auto flex justify-end">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 pt-3"
                    >
                      Read Story <ArrowRight size={12} />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="icon"
                    className="w-8 h-8 text-xs"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card className="p-12 text-center border-dashed">
          <h3 className="text-xl font-bold text-foreground">No Articles Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search criteria or category filter.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  );
}

export default BlogList;
