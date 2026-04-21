import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Discovery",
    body: "1-week paid sprint. We map your domain, audit existing systems, and produce a written technical brief — yours to keep, even if we don't continue.",
    artifacts: ["System diagram", "Risk register", "Effort estimate (±15%)"],
  },
  {
    n: "02",
    title: "Architecture",
    body: "We define service boundaries, data contracts, and non-functional requirements (latency, throughput, RTO/RPO) before writing application code.",
    artifacts: ["ADRs", "API contracts", "Data model"],
  },
  {
    n: "03",
    title: "Development",
    body: "Trunk-based, typed end-to-end, reviewed by a second senior engineer. Demos every Friday on a real preview environment.",
    artifacts: ["Preview envs", "Weekly demo", "Storybook"],
  },
  {
    n: "04",
    title: "Testing",
    body: "Unit, integration, contract, load, and chaos tests run in CI. We refuse to ship features that lack a way to be observed in production.",
    artifacts: ["95%+ critical path coverage", "Load profile", "Runbook"],
  },
  {
    n: "05",
    title: "Deployment",
    body: "Blue-green or canary, zero-downtime migrations, automated rollback. Your team gets the keys and the documentation, not a black box.",
    artifacts: ["IaC repo", "Dashboards", "On-call playbook"],
  },
  {
    n: "06",
    title: "Iteration",
    body: "Optional retainer with monthly capacity, quarterly architecture reviews, and a clear off-ramp whenever you're ready to fully own it.",
    artifacts: ["Monthly report", "SLO review", "Knowledge transfer"],
  },
];

export const Process = () => {
  return (
    <section id="process" className="relative flex min-h-screen flex-col justify-center border-y border-border bg-surface-1/40 py-28">
      <div className="container-tight">
        <div className="mb-14 max-w-2xl">
          <span className="badge-dot mb-5">Process</span>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            A workflow built for
            <br />
            <span className="text-muted-foreground">things that have to keep running.</span>
          </h2>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border-strong bg-border-strong md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="bg-background p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="mono text-xs text-primary">{s.n}</span>
                <span className="mono text-xs text-muted-foreground">step</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-4 space-y-1.5 border-t border-border-strong pt-4">
                {s.artifacts.map((a) => (
                  <div key={a} className="mono flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {a}
                  </div>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
