import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Capabilities } from "@/components/site/Capabilities";
import { Solutions } from "@/components/site/Solutions";
import { CaseStudies } from "@/components/site/CaseStudies";
import { Process } from "@/components/site/Process";
import { Stack } from "@/components/site/Stack";
import { Differentiation } from "@/components/site/Differentiation";
import { Pricing } from "@/components/site/Pricing";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title="Engineering-grade software"
        description="Appnity Softwares ships high-performance web platforms, scalable backends, and AI systems for startups and businesses."
      />
      <Nav />
      <Hero />
      <TrustStrip />
      <Capabilities />
      <Solutions />
      <CaseStudies />
      <Process />
      <Stack />
      <Differentiation />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
