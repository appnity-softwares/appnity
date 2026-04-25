import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, X, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/services/api";

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tagline?: string;
  category: string;
  client_name: string;
  project_url: string;
  industry: string;
  year: number;
  stack: string;
  problem: string;
  approach: string[] | any;
  metrics: { metric: string; label: string }[] | any;
  is_featured: boolean;
  order_index: number;
}

const empty = {
  id: "",
  slug: "",
  title: "",
  description: "",
  category: "",
  client_name: "",
  project_url: "",
  industry: "",
  year: new Date().getFullYear(),
  stack: "",
  problem: "",
  approach: "", // Textarea input as newline separated
  metrics: "",  // Textarea input as metric|label
  is_featured: false,
  order_index: 0,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getPortfolios();
      setProjects(data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Projects · Admin";
    load();
  }, []);

  const openEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      ...empty,
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      client_name: p.client_name,
      project_url: p.project_url,
      industry: p.industry,
      year: p.year,
      stack: p.stack,
      problem: p.problem,
      approach: Array.isArray(p.approach) ? p.approach.join("\n") : "",
      metrics: Array.isArray(p.metrics) 
        ? p.metrics.map((m: any) => `${m.metric}|${m.label}`).join("\n") 
        : "",
      is_featured: p.is_featured,
      order_index: p.order_index,
    });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      client_name: form.client_name.trim(),
      project_url: form.project_url.trim(),
      industry: form.industry.trim(),
      year: Number(form.year),
      stack: form.stack.trim(),
      problem: form.problem.trim(),
      approach: form.approach.split("\n").map((s) => s.trim()).filter(Boolean),
      metrics: form.metrics
        .split("\n")
        .map((line: string) => {
          const [metric, ...rest] = line.split("|");
          return { metric: (metric || "").trim(), label: rest.join("|").trim() };
        })
        .filter((o: any) => o.metric && o.label),
      is_featured: form.is_featured,
      order_index: Number(form.order_index),
    };

    try {
      if (editingId) {
        await adminApi.updatePortfolio(editingId, payload);
        toast.success("Project updated");
      } else {
        await adminApi.createPortfolio(payload);
        toast.success("Project added");
      }
      setOpen(false);
      setForm(empty);
      setEditingId(null);
      load();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await adminApi.deletePortfolio(id);
      toast.success("Deleted");
      setProjects((p) => p.filter((x) => x.id !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-muted-foreground">Portfolio</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Projects</h1>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setForm(empty);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
        >
          <Plus className="h-4 w-4" /> New project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border-strong bg-surface-1">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-left">
              <tr>
                <th className="mono px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">Title</th>
                <th className="mono px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">Category</th>
                <th className="mono px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">Industry</th>
                <th className="mono px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">Year</th>
                <th className="mono px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">Featured</th>
                <th className="px-4 py-3 text-right" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.industry}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.year}</td>
                  <td className="px-4 py-3">{p.is_featured ? "✓" : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-muted-foreground hover:text-primary"
                        aria-label="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-muted-foreground">
                    No projects yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
          <form
            onSubmit={save}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border-strong bg-background p-6 shadow-elevated"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{editingId ? "Edit project" : "New project"}</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
              <Field label="Slug (url)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required />
              <Field label="Client Name" value={form.client_name} onChange={(v) => setForm({ ...form, client_name: v })} required />
              <Field label="Project URL" value={form.project_url} onChange={(v) => setForm({ ...form, project_url: v })} />
              <Field label="Category (e.g. Mobile App)" value={form.category} onChange={(v) => setForm({ ...form, category: v })} required />
              <Field label="Industry" value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} required />
              <Field label="Year" type="number" value={String(form.year)} onChange={(v) => setForm({ ...form, year: Number(v) })} required />
              <Field label="Sort order" type="number" value={String(form.order_index)} onChange={(v) => setForm({ ...form, order_index: Number(v) })} />
            </div>

            <div className="mt-4">
              <Field label="Tagline (Description)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
            </div>

            <Textarea label="Problem" value={form.problem} onChange={(v) => setForm({ ...form, problem: v })} rows={3} />
            <Textarea
              label="Approach (one bullet per line)"
              value={form.approach}
              onChange={(v) => setForm({ ...form, approach: v })}
              rows={4}
            />
            <Textarea
              label="Outcomes (metric|label per line, e.g. 98%|faster load)"
              value={form.metrics}
              onChange={(v) => setForm({ ...form, metrics: v })}
              rows={3}
            />
            <Field label="Stack (comma-separated)" value={form.stack} onChange={(v) => setForm({ ...form, stack: v })} />

            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                className="h-4 w-4 rounded border-border"
              />
              Featured on homepage
            </label>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-70"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} {editingId ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

const Field = ({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) => (
  <div>
    <label className="mono mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </div>
);

const Textarea = ({
  label,
  value,
  onChange,
  rows,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
  required?: boolean;
}) => (
  <div className="mt-4">
    <label className="mono mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
    <textarea
      required={required}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </div>
);

export default AdminProjects;
