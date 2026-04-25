import { useEffect, useState } from "react";
import { Loader2, Trash2, Mail, User, Tag } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/services/api";

interface Lead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getContacts();
      setLeads(data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Leads · Admin";
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await adminApi.deleteContact(id);
      toast.success("Deleted");
      setLeads((l) => l.filter((x) => x.id !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Delete failed");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminApi.updateContactStatus(id, status);
      toast.success("Status updated");
      setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Status update failed");
    }
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
        <div className="space-y-4">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="rounded-xl border border-border-strong bg-surface-1 p-6 shadow-card transition-all hover:border-primary/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      <User className="h-4 w-4 text-primary" />
                      {lead.name || "Anonymous"}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors">
                        {lead.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      {lead.subject || "No Subject"}
                    </div>
                  </div>

                  <p className="mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                    {new Date(lead.created_at).toLocaleString()}
                  </p>
                  
                  <div className="mt-4 rounded-lg bg-surface-2 p-4 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap break-words border border-border/50">
                    {lead.message}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="rounded-md border border-border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      lead.status === 'new' ? 'bg-primary/10 text-primary' : 
                      lead.status === 'closed' ? 'bg-muted text-muted-foreground' : 'bg-surface-3 text-foreground'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => remove(lead.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-destructive/5 rounded-lg"
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
