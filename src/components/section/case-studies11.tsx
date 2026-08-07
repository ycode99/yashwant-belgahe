import { cn } from "@/lib/utils";

interface CaseStudiesCarouselItem {
  id: string;
  logo: string;
  logoAlt?: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

interface CaseStudiesCarouselProps {
  title?: string;
  description?: string;
  items: CaseStudiesCarouselItem[];
  className?: string;
}

interface CaseStudies11Props extends CaseStudiesCarouselProps {}
type Props = Partial<CaseStudies11Props>;

const defaultProps: CaseStudies11Props = {
  items: [
    {
      id: "pipeline-analytics",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/logos/fictional-company-logo-white-1.svg",
      logoAlt: "Northwind Analytics",
      title: "Unified pipeline analytics in a single view",
      description:
        "How a revenue team unified CRM data and product telemetry to shorten sales cycles and make forecasting review meetings less painful.",
      href: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos3/photo-1-3x4.jpg",
    },
    {
      id: "launch-readiness",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/logos/fictional-company-logo-white-2.svg",
      logoAlt: "Stacklane",
      title: "Coordinating a multi-team product launch",
      description:
        "Design, engineering, and go-to-market aligned on one timeline with shared blocks and checklists so launch week stayed predictable.",
      href: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos3/photo-2-3x4.jpg",
    },
    {
      id: "customer-success",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/logos/fictional-company-logo-white-3.svg",
      logoAlt: "Railway Apps",
      title: "Scaling onboarding without growing headcount",
      description:
        "Automated nudges and in-app guidance replaced one-off emails while support kept a clear view of who needed a human touch.",
      href: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/photos3/photo-3-3x4.jpg",
    },
  ],
};

const MAX_ITEMS = 3;

const CaseStudies11 = (props: Props) => {
  const { title, description, items, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleItems = (items ?? []).slice(0, MAX_ITEMS);

  return (
    <section className={cn("py-12 pt-8 pb-6", className)}>
      <div className="container max-w-7xl mx-auto">
        {(title || description) && (
          <div className="mb-6 flex flex-col items-center gap-4 text-center md:mb-9 lg:mb-10">
            {title && (
              <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-xl text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {visibleItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group block rounded-xl"
            >
              <div className="group relative aspect-4/3 w-full overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 h-full bg-linear-to-t from-black/80 via-black/28 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 text-white md:p-5">
                  <div className="mb-2 flex h-7 items-center pt-1">
                    <img
                      src={item.logo}
                      alt={item.logoAlt ?? ""}
                      className="max-h-5 w-auto max-w-[120px] object-contain object-left md:max-h-6 md:max-w-[140px]"
                    />
                  </div>
                  <div className="text-base font-semibold md:text-lg">
                    {item.title}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { CaseStudies11 };
