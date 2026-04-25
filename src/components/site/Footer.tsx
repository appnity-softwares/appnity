import { Link } from "react-router-dom";
import logo from "@/assets/appnity-logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface-1/40 py-12">
      <div className="container-tight">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Appnity Softwares" className="h-8 w-auto" />
              <span className="font-semibold tracking-tight">Appnity Softwares</span>
            </Link>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-muted-foreground">
              <a href="tel:+918450008962" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary/30" />
                +91 8450008962
              </a>
              <a href="mailto:business@appnity.co.in" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary/30" />
                business@appnity.co.in
              </a>
            </div>
          </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">About</Link>
              <Link to="/capabilities" className="hover:text-foreground">Capabilities</Link>
              <Link to="/portfolio" className="hover:text-foreground">Portfolio</Link>
              <Link to="/team" className="hover:text-foreground">Team</Link>
              <Link to="/process" className="hover:text-foreground">Process</Link>
              <Link to="/pricing" className="hover:text-foreground">Pricing</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
            </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="mono text-xs text-muted-foreground">
            © 2025 Appnity Softwares — Architecting Digital Excellence.
          </p>
          <p className="mono text-xs text-muted-foreground">
            All systems operational · <span className="text-primary">●</span> 99.99% uptime
          </p>
        </div>
      </div>
    </footer>
  );
};
