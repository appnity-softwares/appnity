import { motion } from "framer-motion";
import { Globe, Database, Cpu, Smartphone, Workflow, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Globe,
    title: "High-performance web platforms",
    problem: "Marketing sites and dashboards that buckle under traffic, SEO, or feature debt.",
    why: "We build edge-rendered apps that load under 1.2s on 4G, score 95+ on Core Web Vitals, and stay maintainable past year three.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel/Cloudflare"],
  },
  {
    icon: Database,
    title: "Scalable backend architectures",
    problem: "Monoliths that can't grow, microservices that shouldn't exist, queues that drop messages.",
    why: "We design service boundaries around business reality, not hype — typed APIs, observable systems, predictable scaling.",
    stack: ["Node", "Go", "Python", "Postgres", "Redis", "gRPC"],
  },
  {
    icon: Cpu,
    title: "AI-powered automation systems",
    problem: "Generic LLM wrappers that hallucinate, leak data, and break in production.",
    why: "We build RAG pipelines, evaluation harnesses, and agentic flows with measurable accuracy and per-token economics that work.",
    stack: ["OpenAI", "Local LLMs", "RAG", "pgvector", "LangGraph"],
  },
  {
    icon: Smartphone,
    title: "Cross-platform mobile",
    problem: "Two codebases, two teams, half the velocity.",
    why: "One typed codebase shipping to iOS and Android with native performance where it matters and OTA updates where it doesn't.",
    stack: ["React Native", "Expo", "Flutter", "Swift/Kotlin bridges"],
  },
  {
    icon: Workflow,
    title: "DevOps & platform engineering",
    problem: "Deployments that take an hour, environments that drift, on-call that nobody wants.",
    why: "Reproducible infra, blue-green deploys, and observability that turns 3am pages into a 9am ticket.",
    stack: ["Docker", "Terraform", "AWS", "GitHub Actions", "Grafana"],
  },
  {
    icon: ShieldCheck,
    title: "Security & compliance foundations",
    problem: "SOC2 / GDPR / HIPAA blocking enterprise deals.",
    why: "Auth, audit trails, encryption, and policy-as-code baked in from day one — not retrofitted under deadline.",
    stack: ["Auth.js", "OPA", "Vault", "WAF", "SBOMs"],
  },
];

export const Capabilities = () => {
  return (
    <section id="capabilities" className="relative flex min-h-screen flex-col justify-center py-28">
      <div className="container-tight">
        <div className="mb-14 max-w-2xl">
          <span className="badge-dot mb-5">Capabilities</span>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            We don't sell services.
            <br />
            <span className="text-muted-foreground">We build systems.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Each engagement is scoped around a business outcome and a measurable system property —
            performance, reliability, or velocity.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border-strong bg-border-strong md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative bg-surface-1 p-7 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-surface-3 text-primary">
                    <Icon size={18} />
                  </div>
                  <span className="mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.problem}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{item.why}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <span
                      key={s}
                      className="mono rounded-md border border-border-strong bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
