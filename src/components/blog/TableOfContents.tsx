"use client";

import React, { useState, useEffect, useMemo } from "react";
import { HeadingItem } from "@/lib/content";
import { BookOpen, ListOrdered } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/vendors/ui/card";
import { Badge } from "@/vendors/ui/badge";

interface TableOfContentsProps {
  headings: HeadingItem[];
  articleTitle?: string;
}

export function TableOfContents({ headings, articleTitle }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const displayHeadings = useMemo(() => {
    if (!headings) return [];
    if (!articleTitle) return headings;
    const cleanTitle = articleTitle.toLowerCase().trim();
    return headings.filter((h) => h.text.toLowerCase().trim() !== cleanTitle);
  }, [headings, articleTitle]);

  useEffect(() => {
    if (!displayHeadings || displayHeadings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-90px 0px -65% 0px",
        threshold: 0.1,
      }
    );

    displayHeadings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [displayHeadings]);

  if (!displayHeadings || displayHeadings.length === 0) {
    return (
      <Card className="p-4 border text-xs text-muted-foreground font-medium">
        No section headings detected in this article.
      </Card>
    );
  }

  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <Card className="border bg-card/60 backdrop-blur-sm shadow-sm">
      <CardHeader className="pb-3 pt-4 px-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <BookOpen size={16} className="text-primary" /> Table of Contents
          </CardTitle>
          <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
            {displayHeadings.length} Sections
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <ListOrdered size={13} className="text-primary" /> On this page
        </p>

        <nav className="flex flex-col gap-1 max-h-[50vh] overflow-y-auto pr-1 text-xs select-none">
          {displayHeadings.map((heading, index) => {
            const isActive = activeId === heading.id;
            const indentClass =
              heading.level === 1 ? "pl-2" : heading.level === 2 ? "pl-4" : "pl-6";

            return (
              <a
                key={`${heading.id}-${index}`}
                href={`#${heading.id}`}
                onClick={(e) => handleHeadingClick(e, heading.id)}
                className={`
                  block py-1.5 px-2.5 rounded-md transition-all leading-normal text-xs font-medium break-words
                  border-l-2
                  ${indentClass}
                  ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary font-semibold translate-x-0.5"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted/50"
                  }
                `}
                title={heading.text}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}

export default TableOfContents;
