import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calculator, ArrowRight, Clock, ShieldCheck, Smartphone, Globe, Layout, Briefcase, Zap } from "lucide-react";

const options = {
  platforms: [
    { id: "web", label: "Web Application", price: 8000, icon: Globe, desc: "React/Next.js high-perf web app." },
    { id: "mobile", label: "Mobile (iOS & Android)", price: 12000, icon: Smartphone, desc: "Cross-platform React Native app." },
    { id: "both", label: "Both Web & Mobile", price: 18000, icon: Layout, desc: "Unified codebase for all platforms." },
  ],
  types: [
    { id: "mvp", label: "Simple MVP", price: 2000, desc: "Core features to test the market." },
    { id: "saas", label: "SaaS Platform", price: 6000, desc: "Subscriptions, multi-tenancy, & scale." },
    { id: "crm", label: "Custom CRM/ERP", price: 8000, desc: "Complex internal workflows & data." },
    { id: "ecommerce", label: "E-commerce/Marketplace", price: 7000, desc: "Vendor management & transactions." },
  ],
  features: [
    { id: "auth", label: "User Accounts & Profiles", price: 2500, desc: "Secure login, roles & permissions." },
    { id: "payments", label: "Payments & Billing", price: 2500, desc: "Stripe/PayPal, invoices & tax." },
    { id: "admin", label: "Advanced Admin Panel", price: 4000, desc: "Full control over users & system data." },
    { id: "ai", label: "AI/LLM Integration", price: 6000, desc: "GPT-4, RAG, or custom ML models." },
    { id: "chat", label: "Real-time Chat/Sync", price: 3500, desc: "Instant messaging or live collaboration." },
    { id: "analytics", label: "Analytics & SEO", price: 1500, desc: "Traffic tracking & search ranking." },
  ],
};

const tiers = [
  {
    name: "Fixed Project",
    price: "from $18k",
    cadence: "one-time",
    desc: "MVPs, redesigns, scoped builds with a clear deliverable.",
    features: [
      "Written technical brief & estimate (±15%)",
      "Full Strategic Discovery & Roadmap",
      "Custom High-End UI/UX Design (Up to 8 Pages)",
      "Secure Backend & Data Storage",
      "Admin Panel to manage your own content",
      "Cloud Deployment & Optimization",
      "30 Days of Technical Hand-holding",
    ],
    cta: "Scope a project",
    accent: false,
  },
  {
    name: "Monthly Retainer",
    price: "from $9.5k",
    cadence: "/ month",
    desc: "Live products needing continuous engineering capacity.",
    features: [
      "Dedicated 0.5 FTE senior engineer",
      "Unlimited Feature Development",
      "Weekly Video Demos & Strategy Updates",
      "24/7 Monitoring & Performance",
      "Priority Bug Fixes (Same-day response)",
      "Zero Technical Debt Guarantee",
      "Fractional CTO for scaling advice",
    ],
    cta: "Book a call",
    accent: true,
  },
  {
    name: "Dedicated Team",
    price: "from $32k",
    cadence: "/ month",
    desc: "Companies replacing or augmenting an in-house team.",
    features: [
      "2–5 senior engineers + tech lead",
      "Embedded in your tools (Slack, Linear, Git)",
      "SLA-backed delivery cadence",
      "Bank-Grade Security Audit",
      "Full IP & Code Ownership",
      "Direct hire option after 6 months",
      "Custom Training for your team",
    ],
    cta: "Talk to a partner",
    accent: false,
  },
];

export const PricingDetailed = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("web");
  const [selectedType, setSelectedType] = useState("mvp");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);

  const totalPrice = useMemo(() => {
    const platform = options.platforms.find(p => p.id === selectedPlatform)?.price || 0;
    const type = options.types.find(t => t.id === selectedType)?.price || 0;
    const features = selectedFeatures.reduce((acc, fid) => {
      const f = options.features.find(feat => feat.id === fid);
      return acc + (f?.price || 0);
    }, 0);
    
    return platform + type + features;
  }, [selectedPlatform, selectedType, selectedFeatures]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <section className="section-container bg-background">
      <div className="container-tight">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Transparent plans or <br />
              <span className="text-brand-gradient">customized investment.</span>
            </h2>
          </div>
          
          <button 
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center gap-2 rounded-xl border border-border-strong bg-surface-1 px-6 py-3 text-sm font-bold transition-all hover:bg-surface-2 shadow-sm"
          >
            <Calculator size={16} />
            {showCalculator ? "View Standard Plans" : "Project Cost Estimator"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!showCalculator ? (
            <motion.div 
              key="tiers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid gap-6 md:grid-cols-3"
            >
              {tiers.map((t) => (
                <div 
                  key={t.name}
                  className={`relative flex flex-col rounded-2xl border border-border-strong bg-surface-1 p-8 shadow-sm transition-all hover:shadow-md ${
                    t.accent ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                  {t.accent && (
                    <div className="absolute -top-3 left-8 rounded-md bg-primary px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-primary-foreground">
                      Most Picked
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold tracking-tight">{t.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                  
                  <div className="mb-8 border-b border-border/50 pb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight text-foreground">{t.price}</span>
                      <span className="text-xs text-muted-foreground">{t.cadence}</span>
                    </div>
                  </div>

                  <ul className="flex-1 space-y-4">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-xs text-foreground/80 font-medium">
                        <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a 
                    href="#contact" 
                    className={`mt-10 flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold transition-all ${
                      t.accent 
                        ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90" 
                        : "border border-border-strong bg-surface-1 hover:bg-surface-2"
                    }`}
                  >
                    {t.cta}
                    <ArrowRight size={16} />
                  </a>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="calculator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid gap-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-8 space-y-12">
                {/* Platform Selection */}
                <div>
                  <h4 className="label-high-contrast mb-6 flex items-center gap-2">
                    <Globe size={14} /> 1. Select Platform
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {options.platforms.map((p) => {
                      const Icon = p.icon;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPlatform(p.id)}
                          className={`flex flex-col items-start rounded-2xl border p-6 text-left transition-all ${
                            selectedPlatform === p.id 
                              ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm" 
                              : "border-border-strong bg-surface-1 hover:border-border"
                          }`}
                        >
                          <div className={`p-2 rounded-lg mb-4 ${selectedPlatform === p.id ? "bg-primary text-white" : "bg-surface-2 text-muted-foreground"}`}>
                            <Icon size={18} />
                          </div>
                          <span className={`text-sm font-bold ${selectedPlatform === p.id ? "text-primary" : "text-foreground"}`}>
                            {p.label}
                          </span>
                          <p className="mt-2 text-[10px] text-muted-foreground leading-relaxed">
                            {p.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Type Selection */}
                <div>
                  <h4 className="label-high-contrast mb-6 flex items-center gap-2">
                    <Briefcase size={14} /> 2. Product Type
                  </h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {options.types.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedType(t.id)}
                        className={`flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
                          selectedType === t.id 
                            ? "border-primary bg-primary/5 shadow-sm" 
                            : "border-border-strong bg-surface-1 hover:border-border"
                        }`}
                      >
                        <span className={`text-sm font-bold ${selectedType === t.id ? "text-primary" : "text-foreground"}`}>
                          {t.label}
                        </span>
                        <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">
                          {t.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features Selection */}
                <div>
                  <h4 className="label-high-contrast mb-6 flex items-center gap-2">
                    <Zap size={14} /> 3. High-Impact Features
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {options.features.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => toggleFeature(f.id)}
                        className={`flex flex-col items-start rounded-2xl border p-6 text-left transition-all ${
                          selectedFeatures.includes(f.id)
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border-strong bg-surface-1 hover:border-border"
                        }`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span className={`text-sm font-bold ${selectedFeatures.includes(f.id) ? "text-primary" : "text-foreground"}`}>
                            {f.label}
                          </span>
                          <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                            selectedFeatures.includes(f.id) ? "bg-primary border-primary" : "border-border-strong"
                          }`}>
                            {selectedFeatures.includes(f.id) && <Check size={12} className="text-white" />}
                          </div>
                        </div>
                        <p className="mt-2 text-[10px] text-muted-foreground leading-relaxed">
                          {f.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimate Summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 rounded-3xl border border-border-strong bg-surface-1 p-8 shadow-sm">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Estimated Investment</h4>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight text-foreground">${totalPrice.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">Estimate</span>
                  </div>
                  
                  <div className="mt-10 space-y-5 border-y border-border/50 py-8">
                    <div className="flex items-center gap-3 text-xs text-foreground/80 font-medium">
                      <Clock size={16} className="text-primary" />
                      <span>Kickoff in 7-10 days</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-foreground/80 font-medium">
                      <ShieldCheck size={16} className="text-primary" />
                      <span>Full IP & Source Ownership</span>
                    </div>
                  </div>

                  <a 
                    href="#contact"
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                  >
                    Request Detailed Scope
                  </a>
                  <p className="mt-4 text-center text-[10px] text-muted-foreground italic">
                    *Final quote provided after technical discovery session.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
