import { PatternPlaceholder } from "@/components/section/pattern-placeholder";
import { cn } from "@/lib/utils";

interface BackgroundPattern19Props {
  className?: string;
  children?: React.ReactNode;
}

const BackgroundPattern19Overlay = ({ className }: { className?: string }) => {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--muted) 1px, transparent 1px),
          linear-gradient(to bottom, var(--muted) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 0",
        maskImage: `
          repeating-linear-gradient(
            to right,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          repeating-linear-gradient(
            to bottom,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          )
        `,
        WebkitMaskImage: `
          repeating-linear-gradient(
            to right,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          repeating-linear-gradient(
            to bottom,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          )
        `,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
};

const BackgroundPattern19 = ({ className, children }: BackgroundPattern19Props) => {
  return (
    <section
      className={cn(
        "relative flex h-svh max-h-[1200px] min-h-[600px] w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <BackgroundPattern19Overlay />
      {children || <PatternPlaceholder />}
    </section>
  );
};

export { BackgroundPattern19, BackgroundPattern19Overlay };
