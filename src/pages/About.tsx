import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SEO } from "@/components/site/SEO";
import { Target, Users, Globe, Shield, Award, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "SYSTEMS SHIPPED", value: "8+" },
  { label: "CORE ENGINEERS", value: "5" },
  { label: "UPTIME SLA", value: "99.9%" },
  { label: "ACTIVE PARTNERS", value: "4+" },
];

const developmentModel = [
  {
    step: "01",
    title: "Structural Hardening",
    eyebrow: "Waterfall Logic",
    description: "Leveraging Waterfall rigor, we define the core architecture and immutable constraints first. This eliminates mid-cycle ambiguity and ensures a solid technical foundation.",
  },
  {
    step: "02",
    title: "Rapid Prototyping",
    eyebrow: "Visual Validation",
    description: "We build functional MVPs and UX prototypes early. This allows for visual validation and technical feasibility testing before a single line of production code is written.",
  },
  {
    step: "03",
    title: "Spiral Risk Iterations",
    eyebrow: "Continuous Loops",
    description: "We apply Spiral logic for risk-managed development loops. Each iteration involves coding, automated testing, and risk assessment to prevent technical debt.",
  },
  {
    step: "04",
    title: "Hardened Delivery",
    eyebrow: "Enterprise Release",
    description: "The final phase ensures enterprise-grade hardening. We use automated CI/CD pipelines for deployment, followed by comprehensive system documentation.",
  },
];

const trustPillars = [
  {
    title: "Full IP Ownership",
    description: "From the first line of code, you own 100% of the intellectual property. No vendor lock-in, no hidden licensing fees, ever.",
  },
  {
    title: "Bank-Grade Security",
    description: "We implement industry-standard encryption (AES-256), secure API gateways, and rigorous vulnerability testing in every build.",
  },
  {
    title: "Zero Discovery Theater",
    description: "We don't waste weeks on 'discovery sessions.' We move straight to architecture and rapid prototyping to show you real value fast.",
  },
  {
    title: "Technical Transparency",
    description: "Full access to our staging environments and version control. You see exactly what we're building, as we build it.",
  },
];

const About = () => {
  return (
    <SiteLayout>
      <SEO 
        title="About Us · The Engineering Studio" 
        description="Learn about Appnity Softwares, a premium software engineering studio dedicated to building high-performance digital products with radical transparency."
      />
      
      <PageHeader
        eyebrow="The Studio"
        title={
          <>
            <span className="text-foreground">Architecting the future</span>{" "}
            <br />
            <span className="text-brand-gradient">one system at a time.</span>
          </>
        }
        description="Founded on the principles of engineering mastery and design-driven development, Appnity Softwares was built to solve the gap between technical complexity and business growth."
      />

      {/* Story Section */}
      <section className="py-24 border-y border-border/50 bg-surface-1/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] grid-bg" />
        <div className="container-tight relative">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="label-high-contrast mb-4 block">Our Origin</span>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl leading-tight">
                Engineering-first,
                <br />
                <span className="text-muted-foreground">results-oriented.</span>
              </h2>
              <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Most companies struggle with software that slows them down. We started Appnity to change that. We believe software should be an accelerant, not a bottleneck.
                </p>
                <p>
                  Our team consists of senior-grade engineers who have spent years shipping high-stakes platforms. We bring that enterprise rigor to every project, regardless of size.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border/50 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold tracking-tight text-foreground">{s.value}</div>
                    <div className="mono text-[9px] font-black uppercase tracking-[0.2em] text-primary mt-2">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square overflow-hidden rounded-[3rem] border border-blue-100/50 bg-blue-50/30 shadow-2xl group"
            >
              {/* Premium Light Blue Liquid Glass Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 group-hover:scale-110 transition-all duration-1000 ease-out"
                style={{ backgroundImage: 'url("/assets/about/philosophy-bg.png")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-50/90 via-blue-50/10 to-white/40" />
              <div className="absolute inset-0 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all duration-700" />
              
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-8 p-5 rounded-full bg-blue-500/5 backdrop-blur-md border border-blue-500/10 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Award size={32} strokeWidth={1.5} />
                  </div>
                  <blockquote className="text-3xl md:text-4xl font-[900] tracking-tighter text-zinc-950 leading-[1.1] max-w-md">
                    "Engineering is the art of organizing complexity. Our mission is to make that complexity beautiful and invisible."
                  </blockquote>
                  <div className="mt-10 flex flex-col items-center">
                    <div className="h-px w-20 bg-primary/40 mb-6 group-hover:w-32 transition-all duration-700" />
                    <cite className="text-[12px] font-[950] uppercase tracking-[0.3em] text-primary not-italic">
                      THE APPNITY PHILOSOPHY
                    </cite>
                  </div>
                </div>
              </div>

              {/* Technical Detail Overlays */}
              <div className="absolute top-8 left-8 mono text-[8px] uppercase tracking-widest text-primary/20 vertical-text">Structural Clarity</div>
              <div className="absolute bottom-8 right-8 mono text-[8px] uppercase tracking-widest text-primary/20">Precision Engineering</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The SDLC Journey: Simplified for Humans */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="container-tight relative z-10">
          <div className="mb-32 text-center max-w-4xl mx-auto">
            <span className="mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">The Appnity Method</span>
            <h2 className="mt-8 text-4xl font-bold tracking-tight md:text-7xl leading-tight">
              Software engineering, <br />
              <span className="text-muted-foreground">delivered with absolute precision.</span>
            </h2>
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
              We follow a rigorous Software Development Life Cycle (SDLC) that bridges the gap between your vision and a world-class digital product.
            </p>
          </div>

          <div className="relative">
            {/* The Vertical Thread */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-40 relative">
              {[
                {
                  phase: "01",
                  title: "The Vision Handshake",
                  subtitle: "Requirements & Tech Stack",
                  description: "Everything starts with a conversation. We gather your requirements, finalize the budget, and select the optimal technology stack. We don't move forward until the goal is 100% clear.",
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  phase: "02",
                  title: "Architectural Blueprinting",
                  subtitle: "System Mapping",
                  description: "Just like a skyscraper needs a blueprint, software needs architecture. We map out data flows, server logic, and security protocols to ensure the foundation is unbreakable.",
                  icon: <Shield className="w-6 h-6" />,
                },
                {
                  phase: "03",
                  title: "The Iterative Spiral",
                  subtitle: "Prototyping & Feedback Loop",
                  description: "This is where we differ. Instead of building in the dark, we build a functional prototype. You see it, give feedback, we refine it, and loop back. This cycle ensures the final product is exactly what you need.",
                  isSpiral: true,
                  icon: <Target className="w-6 h-6" />,
                },
                {
                  phase: "04",
                  title: "High-Performance Engineering",
                  subtitle: "Hard Development",
                  description: "Once the prototype is approved, our senior engineers translate it into production-grade code. We build for speed, security, and long-term scalability.",
                  icon: <CheckCircle2 className="w-6 h-6" />,
                },
                {
                  phase: "05",
                  title: "Hardened QA Testing",
                  subtitle: "Breaking the System",
                  description: "We put the software through extreme stress tests. We check for bugs, security vulnerabilities, and performance bottlenecks until the system is bulletproof.",
                  icon: <Award className="w-6 h-6" />,
                },
                {
                  phase: "06",
                  title: "Cloud Launch & Evolution",
                  subtitle: "Deployment & Support",
                  description: "We deploy your project to optimized cloud servers. Our partnership doesn't end there—we provide ongoing maintenance and scale the system as your business grows.",
                  icon: <Globe className="w-6 h-6" />,
                },
              ].map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row items-start gap-12 md:gap-0 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content Block */}
                  <div className="md:w-1/2 md:px-16 lg:px-24">
                    <div className={`flex flex-col ${i % 2 === 1 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                      <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Phase {s.phase}</span>
                      <h3 className="text-3xl font-bold tracking-tight mb-2 md:text-4xl">{s.title}</h3>
                      <span className="text-sm font-medium text-muted-foreground/60 mb-6 block uppercase tracking-widest">{s.subtitle}</span>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {s.description}
                      </p>
                      
                      {s.isSpiral && (
                        <div className="mt-12 relative w-full max-w-md">
                          <div className="relative h-64 w-full rounded-[2.5rem] border border-border-strong bg-surface-1/50 overflow-hidden flex items-center justify-center p-8 group/spiral">
                            {/* Technical Backdrop */}
                            <div className="absolute inset-0 opacity-[0.03] grid-bg" />
                            
                            {/* The Spinner Engine */}
                            <div className="relative h-48 w-48 flex items-center justify-center">
                              {/* Outer Orbit */}
                              <div className="absolute inset-0 rounded-full border border-primary/10" />
                              
                              {/* Rotating Gradient Ring */}
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                              />

                              {/* Reverse Orbit */}
                              <motion.div 
                                animate={{ rotate: -360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 rounded-full border-b border-l border-primary/20"
                              />

                              {/* The Central Content */}
                              <div className="relative z-10 flex flex-col items-center">
                                <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-3">
                                  <Target size={20} className="animate-pulse" />
                                </div>
                                <span className="mono text-[9px] font-bold uppercase tracking-[0.3em] text-primary">The Loop</span>
                                <div className="mt-3 flex flex-col items-center gap-1">
                                  <span className="text-[10px] font-medium text-foreground tracking-widest uppercase">Prototype</span>
                                  <ArrowRight size={8} className="text-primary/40 rotate-90" />
                                  <span className="text-[10px] font-medium text-foreground tracking-widest uppercase">Feedback</span>
                                  <ArrowRight size={8} className="text-primary/40 rotate-90" />
                                  <span className="text-[10px] font-medium text-foreground tracking-widest uppercase">Refine</span>
                                </div>
                              </div>

                              {/* Revolving Data Point */}
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                              >
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary shadow-glow" />
                              </motion.div>
                            </div>

                            {/* Label */}
                            <div className="absolute bottom-6 right-8 mono text-[10px] uppercase tracking-[0.4em] text-primary/40 vertical-text">Iteration Cycle</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Central Node */}
                  <div className="relative flex-shrink-0 flex items-center justify-center z-10 mx-auto md:mx-0">
                    <div className="h-12 w-12 rounded-full bg-background border-2 border-border-strong flex items-center justify-center text-primary shadow-glow transition-transform hover:scale-110 duration-500">
                      {s.icon}
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars Section */}
      <section className="py-32 border-t border-border/50 bg-surface-1/10">
        <div className="container-tight">
          <div className="mb-20 text-center">
            <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/5 px-3 py-1 rounded">Trust Parameters</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">Built on absolute reliability.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((p) => (
              <div key={p.title} className="rounded-3xl border border-border-strong bg-background p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-elevated">
                <h3 className="text-sm font-bold tracking-tight text-foreground mb-3">{p.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section className="py-32 border-t border-border/50 bg-background overflow-hidden">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Our Journey.</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                From an R&D core to a full-stack digital mastery.
              </p>
            </div>
            <div className="md:w-2/3 grid gap-12 relative">
               <div className="absolute left-0 top-0 bottom-0 w-px bg-border-strong hidden md:block" />
               <div className="md:pl-12 relative">
                  <div className="absolute left-0 top-1.5 -ml-[3px] h-[7px] w-[7px] rounded-full bg-primary hidden md:block" />
                  <span className="label-high-contrast mb-2 block text-[9px]">Phase 01: The R&D Core</span>
                  <h3 className="text-xl font-bold">Foundation of Excellence</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Started as a research-focused collective solving high-complexity problems for tech founders.</p>
               </div>
               <div className="md:pl-12 relative">
                  <div className="absolute left-0 top-1.5 -ml-[3px] h-[7px] w-[7px] rounded-full bg-primary hidden md:block" />
                  <span className="label-high-contrast mb-2 block text-[9px]">Phase 02: Expansion</span>
                  <h3 className="text-xl font-bold">Scaling Distributed Systems</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Successfully delivered large-scale portals with over 120k+ active users.</p>
               </div>
               <div className="md:pl-12 relative">
                  <div className="absolute left-0 top-1.5 -ml-[3px] h-[7px] w-[7px] rounded-full bg-primary hidden md:block" />
                  <span className="label-high-contrast mb-2 block text-[9px]">Phase 03: The Studio</span>
                  <h3 className="text-xl font-bold">Full-Stack Mastery</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Operating as a premium studio, bridging AI and high-performance backends.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-border/50 bg-surface-1/30">
        <div className="container-tight">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-6">
              <BarChart3 size={24} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-8">Ready to build something legendary?</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="rounded-full bg-primary px-10 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                Work with us →
              </a>
              <a href="/portfolio" className="rounded-full hairline px-10 py-4 text-sm font-bold text-foreground hover:bg-surface-2 transition-colors">
                View our work
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
