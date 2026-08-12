"use client";

import { Menu } from "lucide-react";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/vendors/ui/accordion";
import { Button } from "@/vendors/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/vendors/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/vendors/ui/popover";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/section/theme-toggle";

const NAV_LOGO = {
  url: "https://www.shadcnblocks.com",
  src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
  alt: "logo",
  title: "Shadcnblocks.com",
};

interface SubMenuItem {
  title: string;
  href: string;
  description?: string;
}

interface NavItem {
  name: string;
  link: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", link: "/" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "About", link: "#about" },
  { name: "Contact", link: "#contact" },
  { name: "Blog", link: "#blog" },
];

interface Navbar18Props {
  className?: string;
}

const Navbar18 = ({ className }: Navbar18Props) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto flex items-center justify-between transition-all duration-300 px-8 py-3.5 md:px-12 lg:gap-8",
        isScrolled
          ? "w-full max-w-full rounded-none bg-background/40 backdrop-blur-md"
          : "w-full container md:rounded-b-2xl bg-muted/90 backdrop-blur-sm",
        className,
      )}
    >
      <a href={NAV_LOGO.url} className="flex items-center gap-1">
        <img
          src={NAV_LOGO.src}
          className="max-h-6 dark:invert"
          alt={NAV_LOGO.alt}
        />
      </a>

      <MobileNav />

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="h-full w-full">
          {NAV_ITEMS.map((item, index) =>
            item.hasSubmenu ? (
              <NavigationMenuItem key={index} className="rounded-2xl">
                <NavigationMenuTrigger className="bg-transparent px-3 py-1.5 text-sm font-medium">
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-2xl">
                  <ul
                    className={cn(
                      "grid gap-2 p-2",
                      item.name === "Resources"
                        ? "w-[300px] md:w-[350px] md:grid-cols-2 lg:w-[400px]"
                        : "md:w-[150px] lg:w-[200px]",
                    )}
                  >
                    {item.submenu?.map((sub, i) => (
                      <ListItem
                        key={sub.title || i}
                        title={sub.title}
                        href={sub.href}
                      >
                        {sub.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.link}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent px-3 py-1.5 text-sm font-medium",
                  )}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="hidden md:block">
          <Button
            variant="outline"
            className="h-auto rounded-lg px-4 py-2 text-sm font-medium"
          >
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink render={<a ref={ref} className={cn(
                      "flex flex-col items-start space-y-1 rounded-md p-2 text-sm leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      className,
                    )} {...props} />}><div className="text-sm leading-none font-medium">{title}</div><p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                      {children}
                    </p></NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const MobileNav = () => {
  return (
    <div className="mr-2 flex items-center justify-center md:hidden">
      <Popover>
        <PopoverTrigger>
          <Menu className="size-6 text-foreground" />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-screen max-w-xs overflow-hidden"
        >
          <div className="w-full bg-card/80 pt-2 text-foreground backdrop-blur-md">
            <Accordion className="w-full">
              {NAV_ITEMS.map((navItem, idx) =>
                navItem.hasSubmenu ? (
                  <AccordionItem
                    key={idx}
                    value={navItem.name}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:bg-accent hover:no-underline">
                      <span className="text-foreground">{navItem.name}</span>
                    </AccordionTrigger>
                    <AccordionContent className="rounded-2xl">
                      <div className="ml-4 border-l-2 border-muted pl-2">
                        <ul className="py-1">
                          {navItem.submenu &&
                            navItem.submenu.map((sub, subIdx) => (
                              <li
                                key={sub.title || subIdx}
                                className="px-2 py-2 text-sm hover:bg-accent"
                              >
                                <a href={sub.href} className="block">
                                  {sub.title}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <div
                    key={idx}
                    className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent"
                  >
                    <a
                      href={navItem.link}
                      className="flex items-center justify-between"
                    >
                      <span className="text-foreground">{navItem.name}</span>
                    </a>
                  </div>
                ),
              )}
            </Accordion>
            <div className="flex flex-col gap-2 py-2">
              <Button variant="secondary" className="px-4 py-2 text-sm font-medium">
                Log in
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export { Navbar18 };
