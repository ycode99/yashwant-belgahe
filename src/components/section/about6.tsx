import { Button } from "@/vendors/ui/button";
import { cn } from "@/lib/utils";

interface About6Props {
  className?: string;
}

const About6 = ({ className }: About6Props) => {
  return (
    <section className={cn("pt-20 pb-4 lg:pt-31 lg:pb-6", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:mb-8 lg:text-6xl">
            About Us
          </h1>
          <p className="mb-8 text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed">
            We're a team of passionate innovators building the future, one
            breakthrough at a time. Founded with a vision to solve
            real-world problems through cutting-edge technology and creative
            thinking. Our journey began when we recognized a gap in the
            market and decided to bridge it with innovative solutions.
          </p>
          <div>
            <Button size="lg" render={<a href="#" />} nativeButton={false}>
              Read me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About6 };
