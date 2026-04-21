import { Capabilities } from "@/components/site/Capabilities";
import { Stack } from "@/components/site/Stack";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

const CapabilitiesPage = () => {
  return (
    <SiteLayout>
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
