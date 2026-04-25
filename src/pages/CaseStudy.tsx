import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Layout, ShieldAlert, Cpu } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { publicApi } from "@/services/api";

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  client_name: string;
  industry: string;
  year: number;
  problem: string;
  approach: string | string[]; // Can be JSON string from backend
  metrics: { metric: string; label: string }[];
  stack: string; // Backend returns string (comma separated)
}

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      try {
        const data = await publicApi.getPortfolioBySlug(slug);
        // Handle potential string-encoded JSON from backend
        if (data) {
          if (typeof data.approach === 'string' && data.approach.startsWith('[')) {
            data.approach = JSON.parse(data.approach);
          }
          if (typeof data.metrics === 'string' && data.metrics.startsWith('[')) {
            data.metrics = JSON.parse(data.metrics);
          }
        }
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="container-tight pt-44 pb-32 text-center">
          <div className="mx-auto h-6 w-24 animate-pulse rounded bg-surface-2" />
          <div className="mx-auto mt-6 h-16 w-2/3 animate-pulse rounded bg-surface-2" />
        </div>
      </SiteLayout>
    );
  }

  if (!project) {
    return (
      <SiteLayout>
        <div className="container-tight pt-44 pb-32 text-center">
          <h1 className="text-3xl font-semibold">Case study not found</h1>
          <Link to="/portfolio" className="mono mt-6 inline-block text-sm text-primary hover:underline">
            ← Back to portfolio
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO 
        title={`${project.title} · Case Study`} 
        description={project.tagline} 
      />
      <article className="relative pt-36 pb-24 md:pt-44 noise">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
        <div className="container-tight relative flex flex-col items-center text-center">
          <Link
            to="/portfolio"
            className="label-high-contrast mb-6 inline-flex items-center gap-2 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Portfolio
          </Link>

          <div className="max-w-3xl">
            <span className="mono text-xs uppercase tracking-[0.2em] text-primary font-bold">
              {project.industry} · Case Study {project.year}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-7xl leading-[1.1]">{project.title}</h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">{project.tagline}</p>
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-border" />
              <p className="mono text-[10px] uppercase tracking-widest text-muted-foreground">Client: {project.client_name}</p>
              <span className="h-px w-8 bg-border" />
            </div>
          </div>
        </div>
      </article>

      <section className="py-24 border-y border-border/50 bg-surface-1/30">
        <div className="container-tight">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                  <ShieldAlert size={20} />
                </div>
                <h2 className="label-high-contrast mb-0">The Challenge</h2>
              </div>
              <p className="text-xl leading-relaxed text-foreground/90">{project.problem}</p>

              <div className="mt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Cpu size={20} />
                  </div>
                  <h3 className="label-high-contrast mb-0">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(project.stack || "").split(',').map((s) => (
                    <span
                      key={s}
                      className="mono rounded-lg border border-border-strong bg-surface-2 px-3 py-1.5 text-[11px] font-bold text-muted-foreground"
                    >
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Layout size={20} />
                </div>
                <h2 className="label-high-contrast mb-0">The Architecture</h2>
              </div>
              <div className="rounded-[2rem] border border-border-strong bg-card p-8 md:p-10 shadow-card">
                <ul className="space-y-6">
                  {(Array.isArray(project.approach) ? project.approach : []).map((a, i) => (
                    <li key={i} className="flex gap-4 text-base leading-relaxed text-foreground/90">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-glow" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 grid grid-cols-3 divide-x divide-border-strong rounded-2xl border border-border-strong bg-background shadow-sm">
                {(project.metrics || []).map((o) => (
                  <div key={o.label} className="px-4 py-6 text-center">
                    <div className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{o.metric}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{o.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container-tight">
          <div className="rounded-[3rem] border border-border-strong bg-surface-1 p-16 text-center shadow-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
            <div className="relative z-10">
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl leading-tight">Have a similar system to build?</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                We're currently accepting high-impact projects for Q3. Talk to a senior engineer about your vision.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/contact"
                  className="rounded-full bg-primary px-10 py-4 text-sm font-bold text-primary-foreground shadow-glow hover:scale-105 transition-transform"
                >
                  Request a strategy session →
                </Link>
                <Link to="/portfolio" className="rounded-full hairline px-10 py-4 text-sm font-bold text-foreground hover:bg-surface-2 transition-colors">
                  View other projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default CaseStudy;
