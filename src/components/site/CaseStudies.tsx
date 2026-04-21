import { motion } from "framer-motion";

const cases = [
  {
    tag: "Fintech · Series B",
    client: "A B2B payments platform processing $2.1B/yr",
    problem:
      "Dashboard rendering 60k+ rows froze the UI; webhook ingestion lost ~0.4% of events under burst load.",
    solution: [
      "Replaced client-side aggregation with server-streamed virtualized tables",
      "Rebuilt webhook ingest as an idempotent, partitioned queue with replay",
      "Introduced p95/p99 SLOs wired into PagerDuty",
    ],
    stack: ["Next.js", "Postgres", "Kafka", "Go", "Grafana"],
    outcomes: [
      ["98%", "faster dashboard load"],
      ["0", "webhook events lost (90d)"],
      ["3.1×", "throughput per worker"],
    ],
  },
  {
    tag: "Vertical SaaS · Seed",
    client: "Operations platform for healthcare clinics",
    problem:
      "12-week build cycles. New features required schema migrations that broke staging weekly.",
    solution: [
      "Modular monolith with versioned API contracts and typed SDK",
      "Migration framework with shadow tables + automated rollback",
      "Preview environments per PR with seeded production-like data",
    ],
    stack: ["TypeScript", "Postgres", "tRPC", "Terraform", "AWS"],
    outcomes: [
      ["4 days", "new feature → production"],
      ["0", "broken deploys in Q1"],
      ["62%", "cut in infra cost"],
    ],
  },
  {
    tag: "AI · Pre-seed",
    client: "Legal research copilot for litigation teams",
    problem:
      "Generic GPT-4 answers cited cases that didn't exist. Trust collapsed after week one.",
    solution: [
      "RAG over 4.2M case documents with hybrid BM25 + vector retrieval",
      "Citation grounding layer rejecting any unverified claim",
      "Eval harness running 1,200 golden queries on every model change",
    ],
    stack: ["Python", "pgvector", "OpenAI", "LangGraph", "Ragas"],
    outcomes: [
      ["0%", "hallucinated citations"],
      ["91%", "answer relevance score"],
      ["$0.04", "avg cost per query"],
    ],
  },
];

export const CaseStudies = () => {
  return (
    <section id="work" className="relative py-28">
      <div className="container-tight">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="badge-dot mb-5">Selected work</span>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Engineering decisions,<br />
              <span className="text-muted-foreground">not screenshots.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Each case study describes the system constraint, the architecture we chose, and the
            measurable result. Names are anonymized; numbers are real.
          </p>
        </div>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <motion.article
              key={c.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border-strong bg-surface-1 p-8 shadow-card md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-5">
                  <span className="mono text-xs uppercase tracking-widest text-primary">{c.tag}</span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{c.client}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.problem}</p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {c.stack.map((s) => (
                      <span
                        key={s}
                        className="mono rounded-md border border-border-strong bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-7">
                  <div className="rounded-xl border border-border-strong bg-background/60 p-5">
                    <p className="mono mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                      Architecture
                    </p>
                    <ul className="space-y-2.5">
                      {c.solution.map((s) => (
                        <li key={s} className="flex gap-3 text-sm text-foreground/90">
                          <span className="mt-2 h-1 w-3 shrink-0 bg-primary" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 grid grid-cols-3 divide-x divide-border-strong rounded-xl border border-border-strong bg-background/40">
                    {c.outcomes.map(([n, l]) => (
                      <div key={l} className="px-4 py-4 text-center">
                        <div className="text-xl font-semibold tracking-tight">{n}</div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
