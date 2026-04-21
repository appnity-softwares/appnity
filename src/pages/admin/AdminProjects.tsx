import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  client: string;
  industry: string;
  year: number;
  problem: string;
  approach: string[];
  outcomes: { metric: string; label: string }[];
  stack: string[];
  featured: boolean;
  sort_order: number;
}

const empty = {
  slug: "",
  title: "",
  tagline: "",
  client: "",
  industry: "",
  year: new Date().getFullYear(),
  problem: "",
  approach: "",
  outcomes: "",
  stack: "",
  featured: false,
  sort_order: 0,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    supabase
      .from("projects")
      .select("*")
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        setProjects((data as unknown as Project[]) || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Projects · Admin";
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      tagline: form.tagline.trim(),
      client: form.client.trim(),
      industry: form.industry.trim(),
      year: Number(form.year),
      problem: form.problem.trim(),
      approach: form.approach.split("\n").map((s) => s.trim()).filter(Boolean),
      outcomes: form.outcomes
        .split("\n")
        .map((line) => {
          const [metric, ...rest] = line.split("|");
          return { metric: (metric || "").trim(), label: rest.join("|").trim() };
        })
        .filter((o) => o.metric && o.label),
      stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      featured: form.featured,
      sort_order: Number(form.sort_order),
    };
    const { error } = await supabase.from("projects").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Project added");
    setOpen(false);
    setForm(empty);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    setProjects((p) => p.filter((x) => x.id !== id));
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-muted-foreground">Portfolio</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Projects</h1>
        </div>
        <button
          onClick={() => setOpen(true)}
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
                <th className="mono px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">Slug</th>
                <th className="mono px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">Year</th>
                <th className="mono px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">Featured</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 mono text-xs text-muted-foreground">{p.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.year}</td>
                  <td className="px-4 py-3">{p.featured ? "✓" : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => remove(p.id)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-muted-foreground">
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
              <h2 className="text-xl font-semibold">New project</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
              <Field label="Slug (url)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required />
              <Field label="Client" value={form.client} onChange={(v) => setForm({ ...form, client: v })} required />
              <Field label="Industry" value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} required />
              <Field label="Year" type="number" value={String(form.year)} onChange={(v) => setForm({ ...form, year: Number(v) })} required />
              <Field label="Sort order" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
            </div>

            <div className="mt-4">
              <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} required />
            </div>

            <Textarea label="Problem" value={form.problem} onChange={(v) => setForm({ ...form, problem: v })} rows={3} required />
            <Textarea
              label="Approach (one bullet per line)"
              value={form.approach}
              onChange={(v) => setForm({ ...form, approach: v })}
              rows={4}
              required
            />
            <Textarea
              label="Outcomes (metric|label per line, e.g. 98%|faster load)"
              value={form.outcomes}
              onChange={(v) => setForm({ ...form, outcomes: v })}
              rows={3}
              required
            />
            <Field label="Stack (comma-separated)" value={form.stack} onChange={(v) => setForm({ ...form, stack: v })} />

            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
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
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
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
