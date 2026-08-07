import {
  Blocks,
  ChartLine,
  Globe,
  Layers,
  Lock,
  Palette,
  Rocket,
  Settings,
  Shield,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
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
      icon: <Zap className="size-5" />,
      title: "Full Source Code",
      description:
        "Every block ships as plain React you own. No runtime dependency, no SDK lock-in, just copy and customize.",
    },
    {
      icon: <Palette className="size-5" />,
      title: "Responsive Design",
      description:
        "Every block adapts seamlessly from mobile to desktop with Tailwind's mobile-first utility classes.",
    },
    {
      icon: <Shield className="size-5" />,
      title: "Accessibility & Usability",
      description:
        "Built on Radix UI primitives with proper ARIA attributes, keyboard navigation, and focus management.",
    },
    {
      icon: <Settings className="size-5" />,
      title: "TypeScript Native",
      description:
        "Fully typed props and interfaces so your editor catches issues before they reach production.",
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
    <section className={cn("py-32 pt-5", className)}>
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((feature, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-medium tracking-tight">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature361 };
