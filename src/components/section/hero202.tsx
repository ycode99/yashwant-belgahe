import { OrbitingCircles } from "@/vendors/ui/orbiting-circles";
import { Button } from "@/vendors/ui/button";

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

interface HeroIntegrationsProps {
  className?: string;
  kicker?: string;
  badgeIcon?: Image;
  heading: string;
  headingAccent?: string;
  description: string;
  buttons?: Buttons;
  icons: Image[];
}

type Props = Partial<HeroIntegrationsProps>;

const defaultProps: HeroIntegrationsProps = {
  kicker: "Just Copy Paste",
  badgeIcon: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/shadcn-ui-icon.svg",
    alt: "shadcn/ui",
  },
  heading: "Blocks that connect your workflow.",
  headingAccent: "Stay Productive",
  description:
    "Connect your favorite tools to to the worlds largest collection of Shadcn blocks and components.",
  buttons: {
    primary: {
      text: "Connect",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "View Integrations",
      url: "https://www.shadcnblocks.com",
    },
  },
  icons: [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/airtable-icon.svg",
      alt: "Airtable",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/claude-icon.svg",
      alt: "Claude",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/discord-icon.svg",
      alt: "Discord",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/drive-icon.svg",
      alt: "Google Drive",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/dropbox-icon.svg",
      alt: "Dropbox",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/facebook-icon.svg",
      alt: "Facebook",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/github-icon.svg",
      alt: "GitHub",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/gitlab-icon.svg",
      alt: "GitLab",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/google-icon.svg",
      alt: "Google",
    },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/jira-icon.svg", alt: "Jira" },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/notion-icon.svg",
      alt: "Notion",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/shadcn-ui-icon.svg",
      alt: "shadcn/ui",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/shopify-icon.svg",
      alt: "Shopify",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/sketch-icon.svg",
      alt: "Sketch",
    },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/slack-icon.svg", alt: "Slack" },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/spotify-icon.svg",
      alt: "Spotify",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/stripe-icon.svg",
      alt: "Stripe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/supabase-icon.svg",
      alt: "Supabase",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/vscode-icon.svg",
      alt: "VS Code",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/integrations/youtube-icon.svg",
      alt: "YouTube",
    },
  ],
};

/** Offset pool slice so ring composition differs from hero201. */
function orbitRingsFromPool(pool: string[]) {
  const n = pool.length;
  const offset = Math.floor(n / 3) || 1;
  const extended = Array.from(
    { length: 13 },
    (_, i) => pool[(i + offset) % n]!,
  );
  return {
    ring1: extended.slice(0, 4),
    ring2: extended.slice(4, 9),
    ring3: extended.slice(9, 13),
  };
}

const ORBIT_ICON_PX = 72;

function OrbitIcon({ src }: { src: string }) {
  return (
    <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-background p-2 shadow-sm dark:bg-card">
      <img src={src} alt="" className="size-8 object-contain dark:invert" />
    </div>
  );
}

function Hero202IntegrationOrbit({
  ring1,
  ring2,
  ring3,
}: {
  ring1: readonly string[];
  ring2: readonly string[];
  ring3: readonly string[];
}) {
  const mapIcons = (urls: readonly string[], ringIndex: number) =>
    urls.map((src, index) => (
      <OrbitIcon key={`r${ringIndex}-i${index}`} src={src} />
    ));

  return (
    <div className="relative flex size-full max-h-[min(28rem,85vw)] max-w-[min(28rem,85vw)] items-center justify-center sm:max-h-[min(32rem,80vw)] sm:max-w-[min(32rem,80vw)]">
      <OrbitingCircles iconSize={ORBIT_ICON_PX} radius={92} speed={2.35}>
        {mapIcons(ring1, 0)}
      </OrbitingCircles>
      <OrbitingCircles
        iconSize={ORBIT_ICON_PX}
        radius={156}
        reverse
        speed={1.45}
      >
        {mapIcons(ring2, 1)}
      </OrbitingCircles>
      <OrbitingCircles iconSize={ORBIT_ICON_PX} radius={220} speed={0.92}>
        {mapIcons(ring3, 2)}
      </OrbitingCircles>
    </div>
  );
}

const Hero202 = (props: Props) => {
  const {
    className,
    icons,
    kicker,
    badgeIcon,
    heading,
    headingAccent,
    description,
    buttons,
  } = { ...defaultProps, ...props };
  const accent = headingAccent ?? "";

  const pool = icons.map((l) => l.src);
  const rings = orbitRingsFromPool(pool);

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex max-w-xl flex-col gap-6 lg:max-w-lg">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <img
                className="size-5"
                alt={badgeIcon?.alt ?? defaultProps.badgeIcon!.alt}
                src={badgeIcon?.src ?? defaultProps.badgeIcon!.src}
              />
              {kicker}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-pretty text-foreground lg:text-5xl xl:text-6xl">
              {heading}
              {accent ? (
                <>
                  {" "}
                  <span className="text-muted-foreground">{accent}</span>
                </>
              ) : null}
            </h1>

            {description ? (
              <p className="max-w-2xl text-balance text-muted-foreground lg:text-lg">
                {description}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {buttons?.primary && (
                <Button size="lg" render={<a href={buttons.primary.url} />} nativeButton={false}>{buttons.primary.text}</Button>
              )}
              {buttons?.secondary && (
                <Button variant="outline" size="lg" render={<a href={buttons.secondary.url} />} nativeButton={false}>{buttons.secondary.text}</Button>
              )}
            </div>
          </div>

          <div className="relative flex min-h-[min(22rem,70vw)] justify-center lg:justify-end">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-4 inset-y-8 rounded-4xl bg-[radial-gradient(ellipse_at_center,var(--muted)_0%,transparent_72%)] opacity-70 lg:inset-x-0"
            />
            <div className="relative flex flex-1 items-center justify-center overflow-visible rounded-3xl border border-border/80 bg-muted/25 px-6 py-10 lg:px-10 lg:py-14">
              <Hero202IntegrationOrbit {...rings} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero202 };
