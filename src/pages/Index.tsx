import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { LogoStrip } from "@/components/site/LogoStrip";
import { Capabilities } from "@/components/site/Capabilities";
import { CaseStudies } from "@/components/site/CaseStudies";
import { Process } from "@/components/site/Process";
import { Stack } from "@/components/site/Stack";
import { Differentiation } from "@/components/site/Differentiation";
import { Pricing } from "@/components/site/Pricing";
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
      <LogoStrip />
      <Capabilities />
      <CaseStudies />
      <Process />
      <Stack />
      <Differentiation />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
