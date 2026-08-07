import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface FeatureIconListItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

interface FeatureIconListProps {
  heading?: string;
  description?: string;
  features?: FeatureIconListItem[];
  className?: string;
}

interface Feature361Props extends FeatureIconListProps {}
type Props = Partial<Feature361Props>;

const defaultProps: Feature361Props = {
  features: [
    {
      icon: <MapPin className="size-5" />,
      title: "Location",
      description: "Raipur, Chhattisgarh, India",
    },
    {
      icon: <FaLinkedin className="size-5" />,
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/yashwant-belgahe-22a25a18a/",
      description: "yashwant-belgahe",
    },
    {
      icon: <FaGithub className="size-5" />,
      title: "GitHub",
      href: "https://github.com/ycode99",
      description: "ycode99",
    },
    {
      icon: <Mail className="size-5" />,
      title: "Email",
      href: "mailto:yashbelgahe99@gmail.com",
      description: "yashbelgahe99@gmail.com",
    },
  ],
};

const MAX_FEATURES = 4;

const Feature361 = (props: Props) => {
  const { heading, description, features, className } = {
    ...defaultProps,
    ...props,
  };
  const items = (features ?? []).slice(0, MAX_FEATURES);

  return (
    <section className={cn("py-32 pt-5 pb-5", className)}>
      <div className="container">
        {(heading || description) && (
          <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-4 text-center">
            {heading && (
              <h2 className="text-3xl font-semibold tracking-tight text-pretty md:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="mx-auto max-w-4xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((feature, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-sm text-muted-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="font-medium tracking-tight text-foreground">
                {feature.href ? (
                  <a
                    href={feature.href}
                    target={feature.href.startsWith("http") ? "_blank" : undefined}
                    rel={feature.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="hover:underline hover:text-primary transition-colors break-all"
                  >
                    {feature.description}
                  </a>
                ) : (
                  feature.description
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature361 };
