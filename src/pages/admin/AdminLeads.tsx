import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Lead {
  id: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        setLeads(data || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Leads · Admin";
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    setLeads((l) => l.filter((x) => x.id !== id));
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-muted-foreground">Inbox</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Submitted leads</h1>
        </div>
        <span className="mono text-xs text-muted-foreground">{leads.length} total</span>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="text-sm text-muted-foreground">No leads yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="rounded-xl border border-border-strong bg-surface-1 p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <a
                    href={`mailto:${lead.email}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {lead.email}
                  </a>
                  <p className="mono mt-0.5 text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString()}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap break-words">
                    {lead.message}
                  </p>
                </div>
                <button
                  onClick={() => remove(lead.id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Delete lead"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminLeads;
