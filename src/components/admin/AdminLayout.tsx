import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, Users, Inbox, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/appnity-logo.png";

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
];

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-surface-1 md:flex md:flex-col">
        <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-border">
          <img src={logo} alt="Appnity" className="h-7 w-auto" />
          <span className="font-semibold tracking-tight">Appnity</span>
          <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">admin</span>
        </Link>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-surface-2 text-foreground font-medium"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">{user?.email}</div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="md:hidden flex items-center justify-between border-b border-border bg-surface-1 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Appnity" className="h-6 w-auto" />
            <span className="text-sm font-semibold">Admin</span>
          </Link>
          <button onClick={handleSignOut} className="text-sm text-muted-foreground">
            Sign out
          </button>
        </header>
        <nav className="md:hidden flex gap-1 overflow-x-auto border-b border-border bg-surface-1 px-3 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-1.5 text-xs ${
                  isActive ? "bg-surface-2 text-foreground" : "text-muted-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};
