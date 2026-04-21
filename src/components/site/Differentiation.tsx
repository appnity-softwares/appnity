import { motion } from "framer-motion";

const rows = [
  {
    point: "Senior engineers only",
    them: "Pyramid teams: one architect, six juniors writing the actual code.",
    us: "Every line is written by an engineer with 7+ years of production experience.",
  },
  {
    point: "Performance is a constraint, not a phase",
    them: "Optimization happens after launch — if there's budget left.",
    us: "Latency, bundle size, and database cost are tracked from week one.",
  },
  {
    point: "Maintainability is contractual",
    them: "Codebase becomes a black box. You're stuck with the agency.",
    us: "Documented ADRs, typed contracts, and a written off-ramp from day one.",
  },
  {
    point: "Estimates that hold",
    them: "Quotes drift 3× during the project; surprises become invoices.",
    us: "Fixed-scope estimates land within ±15%, or we eat the difference.",
  },
  {
    point: "We say no",
    them: "Yes to every feature; the product becomes a Frankenstein.",
    us: "We push back when an idea will hurt the system. In writing.",
  },
];

export const Differentiation = () => {
  return (
    <section className="relative flex min-h-screen flex-col justify-center border-y border-border bg-surface-1/40 py-28">
      <div className="container-tight">
        <div className="mb-14 max-w-2xl">
          <span className="badge-dot mb-5">Why Appnity</span>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            There are 1,000 agencies.
            <br />
            <span className="text-muted-foreground">Five of them think like engineers.</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border-strong">
          <div className="grid grid-cols-12 border-b border-border-strong bg-surface-2 px-6 py-3 mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <div className="col-span-4">Dimension</div>
            <div className="col-span-4">Typical agency</div>
            <div className="col-span-4 text-primary">Appnity</div>
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={r.point}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid grid-cols-12 border-b border-border-strong bg-background px-6 py-6 last:border-b-0 md:items-center"
            >
              <div className="col-span-12 mb-3 font-medium tracking-tight md:col-span-4 md:mb-0">
                {r.point}
              </div>
              <div className="col-span-12 mb-2 text-sm text-muted-foreground md:col-span-4 md:mb-0 md:pr-6">
                {r.them}
              </div>
              <div className="col-span-12 text-sm text-foreground md:col-span-4">{r.us}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
