"use client";

import { Plus } from "lucide-react";
import React from "react";

import { Button } from "@/vendors/ui/button";
import type { CarouselApi } from "@/vendors/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/vendors/ui/carousel";
import { cn } from "@/lib/utils";

const Feature242 = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const testimonials = [
    {
      title: "Just Copy Paste Shadcn Blocks",
      imgSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-exchange-between-the-user-and-the-global-network.svg",
      href: "#",
    },
    {
      title: "Build Modern UI/UX",
      imgSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-letters-and-arrows-flying-out-of-a-black-hole.svg",
      href: "#",
    },
    {
      title: "Streamline Your Workflow",
      imgSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-loading-the-next-page.svg",
      href: "#",
    },
    {
      title: "Collaborate Effectively",
      imgSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-many-browser-windows-with-different-information.svg",
      href: "#",
    },
  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(testimonials.length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, testimonials.length]);

  return (
    <section className="overflow-hidden py-32 pt-1">
      <div className="relative container flex flex-col items-center md:px-0 lg:pt-8">
        <DottedDiv className="mt-8 flex w-full items-center justify-center px-2 py-10">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="m-0 flex w-full">
              {testimonials.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="px-2 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative flex h-full max-h-96 w-full flex-col items-end justify-between rounded-3xl bg-muted p-5 text-ellipsis">
                    <img
                      className="max-h-72 w-full opacity-100 transition-all ease-in-out group-hover:scale-90 group-hover:opacity-60"
                      src={item.imgSrc}
                      alt={item.title}
                    />
                    <div className="flex w-full items-center justify-between gap-4">
                      <h5 className="text-2xl leading-7 font-medium tracking-tighter transition-all ease-in-out group-hover:translate-x-4">
                        {item.title}
                      </h5>
                      <a
                        href={item.href}
                        className="relative z-10 cursor-pointer"
                      >
                        <Button
                          variant="outline"
                          className="h-12 w-12 rounded-full bg-transparent transition-all ease-in-out hover:bg-muted"
                        >
                          <Plus className="scale-150" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-8 flex w-full items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">
                  {current.toString().padStart(2, "0")}
                </span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">
                  {count.toString().padStart(2, "0")}
                </span>
              </div>

              <div className="relative mr-10 flex gap-2">
                <CarouselPrevious className="h-10 w-10" />
                <CarouselNext variant="default" className="h-10 w-10" />
              </div>
            </div>
          </Carousel>
        </DottedDiv>
      </div>
    </section>
  );
};

export { Feature242 };

const DottedDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("relative", className)}>
    <div className="absolute top-4 -left-[12.5px] h-[1.5px] w-[110%] bg-muted md:-left-20" />
    <div className="absolute bottom-4 -left-[12.5px] h-[1.5px] w-[110%] bg-muted md:-left-20" />
    <div className="absolute -top-4 left-0 h-[110%] w-[1.5px] bg-muted" />
    <div className="absolute -top-4 right-0 h-[110%] w-[1.5px] bg-muted" />
    <div className="absolute top-[12.5px] left-[-3px] z-10 h-2 w-2 rounded-full bg-foreground" />
    <div className="absolute top-[12.5px] right-[-3px] z-10 h-2 w-2 rounded-full bg-foreground" />
    <div className="absolute bottom-[12.5px] left-[-3px] z-10 h-2 w-2 rounded-full bg-foreground" />
    <div className="absolute right-[-3px] bottom-[12.5px] z-10 h-2 w-2 rounded-full bg-foreground" />
    {children}
  </div>
);
