import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
  srcDark?: string;
  className?: string;
}

interface LogosGridStaticProps {
  heading?: string;
  logos: Logo[];
  className?: string;
}

type Props = Partial<LogosGridStaticProps>;

const defaultProps: LogosGridStaticProps = {
  heading: "Trusted by these companies",
  logos: [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-1.svg",
      alt: "Company logo 1",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-2.svg",
      alt: "Company logo 2",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-3.svg",
      alt: "Company logo 3",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-4.svg",
      alt: "Company logo 4",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-5.svg",
      alt: "Company logo 5",
      className: "h-5 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-6.svg",
      alt: "Company logo 6",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-7.svg",
      alt: "Company logo 7",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-8.svg",
      alt: "Company logo 8",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-9.svg",
      alt: "Company logo 9",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-10.svg",
      alt: "Company logo 10",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-11.svg",
      alt: "Company logo 11",
      className: "h-7 w-auto",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-12.svg",
      alt: "Company logo 12",
      className: "h-7 w-auto",
    },
  ],
  subtitle: undefined,
};

const Logos33 = (props: Props) => {
  const { heading, logos, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section className={cn("bg-muted py-32", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col items-start gap-8 lg:gap-10">
          {heading && (
            <h2 className="text-left text-xl font-semibold tracking-tight text-balance md:text-2xl lg:text-3xl">
              {heading}
            </h2>
          )}
          <div className="grid w-full grid-cols-2 justify-items-start gap-x-8 gap-y-3 sm:grid-cols-3 sm:gap-y-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-12 lg:gap-y-4">
            {logos.map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="flex aspect-3/1 w-full items-center justify-start"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-auto max-h-7 w-auto object-contain dark:invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Logos33 };
