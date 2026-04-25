import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Target, Heart, Zap, User } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SEO } from "@/components/site/SEO";

const teamMembers = [
  {
    id: "1",
    name: "Saurabh Jain",
    role: "Co-founder & CEO",
    bio: "Leading the business strategy and growth. Committed to building Appnity into a premier global engineering house.",
    links: { linkedin: "#", github: "https://github.com/jsaurabh334" },
  },
  {
    id: "2",
    name: "Pushp Raj Sharma",
    role: "Managing Director",
    bio: "Overseeing operational excellence and strategic partnerships. Ensuring absolute precision in project delivery.",
    links: { linkedin: "https://www.linkedin.com/in/pushp-raj-sharma/", github: "https://github.com/pushp314" },
  },
  {
    id: "3",
    name: "Neha Mourya",
    role: "Full Stack Web Developer",
    bio: "Specialist in React, Node.js and distributed systems. Crafting seamless user experiences with robust backend logic.",
    links: { github: "https://github.com/nehamoury", linkedin: "https://www.linkedin.com/in/nehamourya/" },
  },
  {
    id: "4",
    name: "Kunal Daharwal",
    role: "App Developer",
    bio: "Mobile engineering expert specializing in React Native CLI. Building native-grade experiences for iOS and Android.",
    links: { github: "https://github.com/kunal592", linkedin: "#" },
  },
  {
    id: "5",
    name: "Lelin Helina Tandon",
    role: "Head of Human Resources",
    bio: "Building a culture of excellence and senior-grade engineering talent. Managing global operations and team growth.",
    links: { linkedin: "https://www.linkedin.com/in/helina-tandan-27b9b93b9" },
  },
  {
    id: "6",
    name: "Jatin Kurrey",
    role: "SDE & R&D Intern",
    bio: "Focusing on core software development and research into emerging UI/UX architectures. Delivering high-performance digital systems.",
    links: { github: "https://github.com/jatin-kurrey", linkedin: "https://www.linkedin.com/in/jatin-kurrey-07a046251" },
  },
];

const values = [
  {
    icon: Target,
    title: "Extreme Ownership",
    description: "We don't just write code; we take responsibility for the business outcome. If something isn't right, we fix it.",
  },
  {
    icon: Zap,
    title: "Speed with Precision",
    description: "We move fast, but we never compromise on quality. Automated testing and senior oversight are non-negotiable.",
  },
  {
    icon: Heart,
    title: "Radical Candor",
    description: "We tell you what you need to hear, not what you want to hear. Honesty is the foundation of our partnership.",
  },
];

const Team = () => {
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
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="text-center">
                  <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              );
            })}
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
            {teamMembers.map((m, i) => (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-[2rem] border border-border-strong bg-surface-1 p-10 shadow-card transition-all hover:shadow-elevated"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <User size={32} strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight">{m.name}</h3>
                <p className="mono mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{m.role}</p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground opacity-80 line-clamp-3">{m.bio}</p>

                <div className="mt-8 flex items-center gap-4">
                  {m.links?.twitter && (
                    <a href={m.links.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {m.links?.github && (
                    <a href={m.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {m.links?.linkedin && (
                    <a href={m.links.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-32 rounded-[3rem] border border-border-strong bg-surface-1 p-16 text-center shadow-elevated overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">We hire rarely. We look for technical excellence.</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                If you've shipped distributed systems, designed product surfaces that feel inevitable, or built AI
                pipelines that hold up in production — we'd like to hear from you.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="mailto:careers@appnity.softwares"
                  className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                >
                  Join the elite →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Team;
