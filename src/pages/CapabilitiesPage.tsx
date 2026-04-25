import { Capabilities } from "@/components/site/Capabilities";
import { Stack } from "@/components/site/Stack";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SEO } from "@/components/site/SEO";

const CapabilitiesPage = () => {
  return (
    <SiteLayout>
      <SEO 
        title="Capabilities · Technical Expertise" 
        description="From high-performance web platforms to scalable backends and AI integrations, explore our end-to-end engineering capabilities."
      />
      <PageHeader
        eyebrow="What we build"
        title={
          <>
            <span className="text-foreground">Engineering capabilities,</span>{" "}
            <span className="text-brand-gradient">end to end.</span>
          </>
        }
        description="Full-stack web, distributed backends, AI systems, and the design-engineering layer that ties it all together."
      />
      <Capabilities />
      <Stack />
    </SiteLayout>
  );
};

export default CapabilitiesPage;
