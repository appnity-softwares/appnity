import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderKanban, Inbox, Users } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ projects: 0, team: 0, leads: 0 });

  useEffect(() => {
    document.title = "Admin · Appnity";
    Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("team_members").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
    ]).then(([p, t, l]) => {
      setCounts({ projects: p.count || 0, team: t.count || 0, leads: l.count || 0 });
    });
  }, []);

  const cards = [
    { label: "Projects", value: counts.projects, icon: FolderKanban, to: "/admin/projects" },
    { label: "Team members", value: counts.team, icon: Users, to: "/admin/team" },
    { label: "Leads", value: counts.leads, icon: Inbox, to: "/admin/leads" },
  ];

  return (
    <AdminLayout>
      <div className="mb-10">
        <p className="mono text-xs uppercase tracking-widest text-muted-foreground">Welcome back</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{user?.email}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="group rounded-2xl border border-border-strong bg-surface-1 p-6 shadow-card transition-all hover:shadow-elevated"
          >
            <div className="flex items-center justify-between">
              <span className="mono text-xs uppercase tracking-widest text-muted-foreground">{c.label}</span>
              <c.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </div>
            <div className="mt-4 text-4xl font-semibold tracking-tight">{c.value}</div>
            <div className="mono mt-2 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Manage →
            </div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
