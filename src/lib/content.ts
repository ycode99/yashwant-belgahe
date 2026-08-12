import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";
import { getImageUrl } from "./utils";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
  readTime: string;
  category: string;
  contentHtml: string;
  headings: HeadingItem[];
}

export interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
}

/**
 * Parses raw markdown content into HTML string and extracts <h1>-<h3> headings with unique anchor IDs
 */
export function parseMarkdownContent(rawMarkdown: string): { contentHtml: string; headings: HeadingItem[] } {
  const markedLexer = new Marked();
  const seenHeadings = new Map<string, number>();

  const slugify = (text: string) => {
    let slug = text
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    if (!slug) slug = "section";
    const count = seenHeadings.get(slug) || 0;
    seenHeadings.set(slug, count + 1);
    return count > 0 ? `${slug}-${count}` : slug;
  };

  const headings: HeadingItem[] = [];
  const tokens = markedLexer.lexer(rawMarkdown);

  tokens.forEach((token) => {
    if (token.type === "heading" && token.depth <= 3) {
      const text = token.text.trim();
      const id = slugify(text);
      headings.push({
        id,
        text,
        level: token.depth,
      });
    }
  });

  const seenRender = new Map<string, number>();
  const slugifyRender = (text: string) => {
    let slug = text
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    if (!slug) slug = "section";
    const count = seenRender.get(slug) || 0;
    seenRender.set(slug, count + 1);
    return count > 0 ? `${slug}-${count}` : slug;
  };

  const markedParser = new Marked({
    renderer: {
      heading({ text, depth }) {
        const id = slugifyRender(text);
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, text }) {
        const isExternal = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
        const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
        const titleAttr = title ? ` title="${title}"` : "";
        const finalHref = isExternal || href.startsWith("#") ? href : getImageUrl(href);
        return `<a href="${finalHref}"${titleAttr}${targetAttr}>${text}</a>`;
      },
    },
  });

  const contentHtml = markedParser.parse(rawMarkdown) as string;

  return {
    contentHtml,
    headings,
  };
}

/**
 * Gets all markdown file names in content/blog directory safely
 */
function getBlogFiles(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    fs.mkdirSync(blogDirectory, { recursive: true });
    return [];
  }
  return fs.readdirSync(blogDirectory).filter((file) => file.endsWith(".md"));
}

/**
 * Fetches all blog posts, sorted by date descending
 */
export function getAllBlogPosts(): BlogPostData[] {
  const files = getBlogFiles();
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(blogDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const { contentHtml, headings } = parseMarkdownContent(content);

    return {
      slug,
      title: data.title || "Untitled Article",
      description: data.description || "",
      date: data.date || "",
      tags: data.tags || [],
      coverImage: data.coverImage || "",
      featured: Boolean(data.featured),
      readTime: data.readTime || "5 min read",
      category: data.category || "General",
      contentHtml,
      headings,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Fetches a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPostData | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const { contentHtml, headings } = parseMarkdownContent(content);

    return {
      slug,
      title: data.title || "Untitled Article",
      description: data.description || "",
      date: data.date || "",
      tags: data.tags || [],
      coverImage: data.coverImage || "",
      featured: Boolean(data.featured),
      readTime: data.readTime || "5 min read",
      category: data.category || "General",
      contentHtml,
      headings,
    };
  } catch {
    return null;
  }
}

/**
 * Returns all categories with post counts
 */
export function getAllCategories(): CategoryInfo[] {
  const posts = getAllBlogPosts();
  const categoryMap = new Map<string, { name: string; count: number }>();

  posts.forEach((post) => {
    const name = post.category;
    const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    const existing = categoryMap.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      categoryMap.set(slug, { name, count: 1 });
    }
  });

  return Array.from(categoryMap.entries()).map(([slug, info]) => ({
    name: info.name,
    slug,
    count: info.count,
  }));
}

/**
 * Gets related blog posts based on matching category
 */
export function getRelatedBlogPosts(currentSlug: string, category: string, limit: number = 3): BlogPostData[] {
  const allPosts = getAllBlogPosts().filter((p) => p.slug !== currentSlug);
  const sameCategory = allPosts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  const otherPosts = allPosts.filter((p) => p.category.toLowerCase() !== category.toLowerCase());

  return [...sameCategory, ...otherPosts].slice(0, limit);
}
