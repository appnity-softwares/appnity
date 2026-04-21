import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      {children}
      <Footer />
    </main>
  );
};
