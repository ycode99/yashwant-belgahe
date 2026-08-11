"use client";
import { Play } from "lucide-react";
import { Fragment, useState } from "react";

import { AspectRatio } from "@/vendors/ui/aspect-ratio";
import { Button } from "@/vendors/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/vendors/ui/dialog";
import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
  srcDark?: string;
}
interface Button {
  text: string;
  url: string;
  icon?: React.ReactNode;
}
interface Buttons {
  primary?: Button;
  secondary?: Button;
}
interface Badge {
  text: string;
  announcement?: string;
  url?: string;
}

interface HeroTriImageProps {
  badge?: Badge;
  heading: string;
  description: string;
  buttons?: Buttons;
  images: [Image, Image, Image];
  className?: string;
}

interface Hero173Props extends HeroTriImageProps {}
type Props = Partial<Hero173Props>;

const defaultProps: Hero173Props = {
  badge: {
    text: "Hi, I'm",
    announcement: "Check out our latest updates",
  },
  heading: "Yashwant Belgahe",
  description:
    "Finely crafted components built with React, Tailwind and shadcn/ui. Developers can copy and paste these blocks directly into their project.",
  buttons: {
    primary: {
      text: "Discover all components",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://www.shadcnblocks.com",
    },
  },
  images: [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos4/photo1.png",
      alt: "Portrait photo one",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos4/photo2.png",
      alt: "Portrait photo two",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos4/photo3.png",
      alt: "Portrait photo three",
    },
  ],
};

const Hero173 = (props: Props) => {
  const { badge, heading, description, buttons, images, className } = {
    ...defaultProps,
    ...props,
  };

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <Fragment>
      <section className={cn("font-dm_sans py-12 md:py-20", className)}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              {badge && (
                <p className="text-sm font-medium tracking-wider text-muted-foreground">
                  {badge.text}
                </p>
              )}
              <div className="flex max-w-3xl flex-col gap-6">
                <h1 className="text-4xl leading-tight font-medium md:text-5xl xl:text-6xl">
                  {heading}
                </h1>
                <p className="text-xl text-balance text-muted-foreground">
                  {description}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 py-4">
                {buttons?.primary && (
                  <Button className="block h-fit w-fit rounded-sm px-5 py-3.5 text-sm font-medium tracking-wider text-nowrap" render={<a href={buttons.primary.url} />} nativeButton={false}>{buttons.primary.text}</Button>
                )}
                {buttons?.secondary && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsVideoOpen(true)}
                    className="h-fit w-fit rounded-sm px-5 py-3.5 text-sm font-medium tracking-wider"
                  >
                    <Play className="size-3 fill-foreground" />
                    {buttons.secondary.text}
                  </Button>
                )}
              </div>
            </div>
            <div>
              <div className="relative mx-auto aspect-[0.789340102/1] max-w-md">
                <div className="absolute bottom-0 left-0 z-30 w-[63%]">
                  <AspectRatio
                    ratio={0.724137931 / 1}
                    className="overflow-hidden"
                  >
                    <img
                      src={images[1].src}
                      alt={images[1].alt}
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>

                <div className="absolute top-1/2 left-1/2 z-20 w-[63%] -translate-x-1/2 -translate-y-1/2">
                  <AspectRatio
                    ratio={0.724137931 / 1}
                    className="overflow-hidden"
                  >
                    <img
                      src={images[0].src}
                      alt={images[0].alt}
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>

                <div className="absolute top-0 right-0 z-10 w-[63%]">
                  <AspectRatio
                    ratio={0.724137931 / 1}
                    className="overflow-hidden"
                  >
                    <img
                      src={images[2].src}
                      alt={images[2].alt}
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export { Hero173 };
