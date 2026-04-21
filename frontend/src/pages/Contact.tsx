import { CTA } from "@/components/site/CTA";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

const Contact = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Start a project"
        title={
          <>
            <span className="text-foreground">Tell us what</span>{" "}
            <span className="text-brand-gradient">you're building.</span>
          </>
        }
        description="A senior engineer reads every brief and replies within one business day. No sales rep, no discovery call gauntlet."
      />
      <CTA />
    </SiteLayout>
  );
};

export default Contact;
