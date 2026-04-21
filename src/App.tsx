import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import CaseStudy from "./pages/CaseStudy.tsx";
import Team from "./pages/Team.tsx";
import ProcessPage from "./pages/ProcessPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import Contact from "./pages/Contact.tsx";
import CapabilitiesPage from "./pages/CapabilitiesPage.tsx";
import Auth from "./pages/Auth.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminLeads from "./pages/admin/AdminLeads.tsx";
import AdminProjects from "./pages/admin/AdminProjects.tsx";
import AdminTeam from "./pages/admin/AdminTeam.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
