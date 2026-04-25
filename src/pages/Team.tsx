import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Target, Heart, Zap, User } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SEO } from "@/components/site/SEO";
import { publicApi } from "@/services/api";

const iconMap: any = {
  Target: Target,
  Zap: Zap,
  Heart: Heart,
};

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamData, valuesData] = await Promise.all([
          publicApi.getTeam(),
          publicApi.getValues(),
        ]);
        setTeamMembers(teamData || []);
        setValues(valuesData || []);
      } catch (error) {
        console.error("Failed to fetch team data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SiteLayout>
      <SEO 
        title="Our Team · Senior Engineering Collective" 
        description="Meet the engineering minds behind Appnity Softwares. A dedicated collective of senior experts building high-precision software."
      />
      <PageHeader
        eyebrow="The core team"
        title={
          <>
            <span className="text-foreground">A small team of</span>{" "}
            <span className="text-brand-gradient">senior engineers.</span>
          </>
        }
        description="No account managers. No junior-to-senior pyramid. The people you see here are the people building your product."
      />

      {/* Values Section */}
      <section className="py-20 bg-surface-1/30">
        <div className="container-tight">
          <div className="grid gap-12 lg:grid-cols-3">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-200 mb-6" />
                  <div className="h-6 w-32 bg-zinc-200 mb-3 rounded" />
                  <div className="h-4 w-48 bg-zinc-200 rounded" />
                </div>
              ))
            ) : (
              values.map((v) => {
                const Icon = iconMap[v.icon] || Target;
                return (
                  <div key={v.id} className="text-center">
                    <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container-tight">
          <div className="mb-16">
            <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/5 px-3 py-1 rounded">The Core Squad</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl text-foreground">
              Engineering minds 
              <br />
              <span className="text-muted-foreground">behind your success.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse h-64 rounded-[2rem] bg-zinc-100" />
              ))
            ) : (
              teamMembers.map((m, i) => (
                <motion.article
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-border-strong bg-surface-1 p-10 shadow-card transition-all hover:shadow-elevated"
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-primary/10">
                        {m.photo ? (
                          <img src={m.photo} alt={m.full_name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-primary">
                            <User size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {m.social_links?.github && (
                          <a href={m.social_links.github} target="_blank" rel="noreferrer" className="rounded-full p-2 text-muted-foreground hover:bg-zinc-100 hover:text-foreground">
                            <Github size={16} />
                          </a>
                        )}
                        {m.social_links?.linkedin && (
                          <a href={m.social_links.linkedin} target="_blank" rel="noreferrer" className="rounded-full p-2 text-muted-foreground hover:bg-zinc-100 hover:text-foreground">
                            <Linkedin size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold tracking-tight text-foreground">{m.full_name}</h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-primary">{m.role}</p>
                      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Team;
