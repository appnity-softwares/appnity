import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/appnity-logo.png";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary/10">
      {/* THEME BACKGROUND GRADIENT (Subtle Blue) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg"
      >
        {/* APPNITY LOGO */}
        <Link to="/" className="mb-12 flex flex-col items-center gap-2 group transition-opacity hover:opacity-80">
          <img src={logo} alt="Appnity" className="h-14 w-auto mb-2" />
          <div className="flex flex-col items-center">
             <span className="text-2xl font-black tracking-tight text-foreground">Appnity</span>
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">Softwares</span>
          </div>
        </Link>

        {/* NORMAL MINIMAL CONTENT */}
        <div className="space-y-4">
           <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-foreground leading-none">
             404.
           </h1>
           <h2 className="text-2xl font-bold tracking-tight text-foreground">
             Page not found
           </h2>
           <p className="text-muted-foreground text-base max-w-sm mx-auto leading-relaxed">
             Sorry, the page you're looking for doesn't exist or has been moved to a new location.
           </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            <ArrowLeft size={16} />
            Back to safety
          </Link>
          <Link 
            to="/contact" 
            className="rounded-full border border-border-strong bg-white px-8 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-surface-2"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>

      {/* FOOTER DETAIL */}
      <div className="absolute bottom-10">
         <span className="mono text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground/30">
           Engineering Systems & Softwares
         </span>
      </div>
    </div>
  );
};

export default NotFound;
