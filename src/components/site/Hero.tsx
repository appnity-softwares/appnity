import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 noise">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 bg-gradient-radial blur-2xl" aria-hidden />

      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <span className="badge-dot">Now booking Q2 — 2 slots remaining</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-center text-5xl font-semibold tracking-tight md:text-7xl"
        >
          <span className="text-foreground">Software that survives</span>
          <br />
          <span className="text-brand-gradient">contact with reality.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground"
        >
          We design and engineer web platforms, backend systems, and AI products for teams that
          treat software as leverage — not as a deliverable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Start a project
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full hairline px-6 py-3 text-sm font-medium text-foreground hover:bg-surface-2"
          >
            View work
          </a>
        </motion.div>

        {/* Live system card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <div className="glass rounded-2xl p-2 shadow-elevated">
            <div className="rounded-xl border border-border-strong bg-surface-1 p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/80 animate-pulse-glow" />
                </div>
                <span className="mono text-xs text-muted-foreground">appnity ~ production.log</span>
              </div>
              <pre className="mono overflow-x-auto text-xs leading-relaxed text-muted-foreground md:text-sm">
{`▸ deploy  api.acme-fintech.com         build 4.21s   p95 38ms   ✓
▸ migrate users → partitioned (12.4M)   3.1s          0 downtime ✓
▸ ai/rag retrieval latency              -62%          ✓
▸ web vitals (lcp / inp / cls)          1.1s / 84 / 0.01          ✓
▸ uptime (90d)                          `}<span className="text-primary">99.99%</span>
              </pre>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 divide-x divide-border-strong rounded-xl border border-border-strong bg-surface-1/50 sm:grid-cols-4">
            {[
              ["38ms", "Median API p95"],
              ["1.1s", "Avg LCP shipped"],
              ["99.99%", "90-day uptime"],
              ["0", "Production rollbacks (Q1)"],
            ].map(([n, l]) => (
              <div key={l} className="px-4 py-5 text-center">
                <div className="text-2xl font-semibold tracking-tight text-foreground">{n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
