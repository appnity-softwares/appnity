import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { Loader2 } from "lucide-react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index.tsx"));
import NotFound from "./pages/NotFound.tsx";
const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const CaseStudy = lazy(() => import("./pages/CaseStudy.tsx"));
const Team = lazy(() => import("./pages/Team.tsx"));
const ProcessPage = lazy(() => import("./pages/ProcessPage.tsx"));
const PricingPage = lazy(() => import("./pages/PricingPage.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const CapabilitiesPage = lazy(() => import("./pages/CapabilitiesPage.tsx"));
const Auth = lazy(() => import("./pages/Auth.tsx"));
const About = lazy(() => import("./pages/About.tsx"));

// Admin pages are heavy, definitely lazy load these
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads.tsx"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects.tsx"));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// Professional loading state
const PageLoader = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mono text-[10px] uppercase tracking-widest text-muted-foreground">Initializing Systems...</p>
    </div>
  </div>
);

import { ScrollToTop } from "@/components/site/ScrollToTop";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/capabilities" element={<CapabilitiesPage />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="/team" element={<Team />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
              <Route path="/admin/leads" element={<RequireAdmin><AdminLeads /></RequireAdmin>} />
              <Route path="/admin/projects" element={<RequireAdmin><AdminProjects /></RequireAdmin>} />
              <Route path="/admin/team" element={<RequireAdmin><AdminTeam /></RequireAdmin>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
