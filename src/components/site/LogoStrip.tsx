const logos = [
  "Acme Fintech", "Northwind", "Helix Labs", "Lumen AI", "Parallel",
  "Obsidian", "Forge", "Kernel", "Vector Health", "Stratus",
];

export const LogoStrip = () => {
  return (
    <section className="relative border-y border-border bg-surface-1/40 py-8">
      <div className="container-tight">
        <p className="mono mb-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
          Systems shipped for teams at
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-12 pr-12">
            {[...logos, ...logos].map((name, i) => (
              <span
                key={i}
                className="mono whitespace-nowrap text-sm tracking-tight text-muted-foreground/80 hover:text-foreground transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
