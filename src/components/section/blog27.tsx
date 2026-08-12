"use client";
import { ArrowRight, Slash } from "lucide-react";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import Link from "next/link";

import { AspectRatio } from "@/vendors/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/vendors/ui/breadcrumb";
import { Button } from "@/vendors/ui/button";
import { Card, CardContent } from "@/vendors/ui/card";
import { Label } from "@/vendors/ui/label";
import { RadioGroup, RadioGroupItem } from "@/vendors/ui/radio-group";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/content";

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface Post {
  category: string;
  title: string;
  summary: string;
  link: string;
  cta: string;
  thumbnail: string;
}

interface Category {
  label: string;
  value: string;
}

interface FilterFormProps {
  categories: Array<Category>;
  value: string;
  onValueChange: (value: string) => void;
}

interface BlogsResultProps {
  posts: Array<Post>;
  categories: Array<Category>;
}

interface BreadcrumbBlogProps {
  breadcrumb: Array<BreadcrumbItem>;
}

const POSTS_PER_PAGE = 6;

const BREADCRUMB: Array<BreadcrumbItem> = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Blog",
    link: "/blog",
  },
];

const FilterForm = ({ categories, value, onValueChange }: FilterFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="flex w-full min-w-0 flex-row flex-nowrap items-center justify-start gap-x-4 overflow-x-auto overflow-y-hidden pb-1 [scrollbar-gutter:stable] sm:gap-x-6"
        aria-label="Filter by category"
      >
        {categories.map((category) => {
          const id = `blog27-cat-${category.value}`;
          return (
            <div
              key={category.value}
              className="flex shrink-0 items-center gap-2.5 py-1"
            >
              <RadioGroupItem value={category.value} id={id} />
              <Label
                htmlFor={id}
                className="cursor-pointer whitespace-nowrap text-foreground font-medium"
              >
                {category.label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </form>
  );
};

const BlogsResult = ({ posts, categories }: BlogsResultProps) => {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.value ?? "all",
  );

  const handleFilterChange = useCallback((next: string) => {
    setSelectedCategory(next);
    setVisibleCount(POSTS_PER_PAGE);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return posts;
    }
    return posts.filter(
      (post) => post.category.toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [posts, selectedCategory]);

  const postsToDisplay = filteredPosts;
  const hasMore = visibleCount < postsToDisplay.length;

  return (
    <div>
      <FilterForm
        categories={categories}
        value={selectedCategory}
        onValueChange={handleFilterChange}
      />
      <div className="flex w-full flex-col gap-4 py-8 lg:gap-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {postsToDisplay.slice(0, visibleCount).map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
        <div className="flex justify-center">
          {hasMore && (
            <Button variant="secondary" onClick={handleLoadMore}>
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const BreadcrumbBlog = ({ breadcrumb }: BreadcrumbBlogProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, i) => {
          return (
            <Fragment key={`${item.label}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i < breadcrumb.length - 1 ? (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              ) : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BlogCard = ({ title, thumbnail, summary, link, cta }: Post) => {
  return (
    <Link href={link} className="block h-full w-full group">
      <Card className="flex h-full flex-col rounded-lg border border-border py-0 shadow-none ring-0 hover:border-primary/50 transition-all duration-300">
        <CardContent className="flex flex-1 flex-col p-0">
          <AspectRatio ratio={1.520833333} className="overflow-hidden bg-muted rounded-t-lg">
            <img
              src={thumbnail}
              alt={title}
              className="block size-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </AspectRatio>
          <div className="flex flex-1 flex-col justify-between gap-5 p-5">
            <div className="space-y-3">
              <h2 className="text-lg leading-tight font-semibold md:text-xl group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </h2>
              <div className="w-full">
                <p className="text-sm leading-[1.4] font-normal text-muted-foreground line-clamp-3">
                  {summary}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
              {cta}
              <ArrowRight size={14} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

interface Blog27Props {
  className?: string;
  posts?: BlogPostData[];
}

const Blog27 = ({ className, posts = [] }: Blog27Props) => {
  const allPosts = posts;

  const categories: Category[] = useMemo(() => {
    const catSet = new Set<string>();
    allPosts.forEach((p) => {
      if (p.category) catSet.add(p.category);
    });
    const items = Array.from(catSet).map((cat) => ({
      label: cat,
      value: cat.toLowerCase(),
    }));
    return [{ label: "All", value: "all" }, ...items];
  }, [allPosts]);

  const primaryPostData: Post | null = useMemo(() => {
    if (allPosts.length === 0) return null;
    const featured = allPosts.find((p) => p.featured) || allPosts[0];
    return {
      category: featured.category,
      title: featured.title,
      summary: featured.description,
      link: `/blog/${featured.slug}`,
      cta: "Read Article",
      thumbnail:
        featured.coverImage ||
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    };
  }, [allPosts]);

  const mappedPosts: Post[] = useMemo(() => {
    return allPosts.map((p) => ({
      category: p.category,
      title: p.title,
      summary: p.description,
      link: `/blog/${p.slug}`,
      cta: "Read Article",
      thumbnail:
        p.coverImage ||
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    }));
  }, [allPosts]);

  return (
    <section className={cn("pb-32", className)}>
      <div className="bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat">
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col justify-between gap-12">
            <div className="flex w-full max-w-[36rem] flex-col gap-8">
              <BreadcrumbBlog breadcrumb={BREADCRUMB} />
              <div className="flex w-full flex-col gap-5">
                <h1 className="text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl">
                  Engineering Blog & Chronicles
                </h1>
                <p className="text-xl leading-[1.4] text-muted-foreground">
                  In-depth articles, practical tutorials, and architectural insights on modern full-stack web development and software engineering.
                </p>
              </div>
            </div>
          </div>

          {primaryPostData && (
            <div className="w-full max-w-[27.5rem]">
              <BlogCard {...primaryPostData} />
            </div>
          )}
        </div>
      </div>
      <div className="py-20">
        <div className="container flex flex-col gap-8">
          <h2 className="text-[1.75rem] leading-none font-medium md:text-[2.25rem] lg:text-[2rem]">
            All Articles
          </h2>
          <div>
            <BlogsResult posts={mappedPosts} categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog27 };
