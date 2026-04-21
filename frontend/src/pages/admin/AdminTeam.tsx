import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  sort_order: number;
}

const empty = { name: "", role: "", bio: "", twitter: "", github: "", linkedin: "", sort_order: 0 };

const AdminTeam = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    supabase
      .from("team_members")
      .select("id,name,role,bio,sort_order")
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        setMembers((data as Member[]) || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Team · Admin";
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const links: Record<string, string> = {};
    if (form.twitter) links.twitter = form.twitter;
    if (form.github) links.github = form.github;
    if (form.linkedin) links.linkedin = form.linkedin;

    const { error } = await supabase.from("team_members").insert({
      name: form.name.trim(),
      role: form.role.trim(),
      bio: form.bio.trim(),
      links,
      sort_order: Number(form.sort_order),
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Team member added");
    setOpen(false);
    setForm(empty);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    setMembers((m) => m.filter((x) => x.id !== id));
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-muted-foreground">People</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Team</h1>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
        >
          <Plus className="h-4 w-4" /> New member
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {members.map((m) => (
            <div key={m.id} className="rounded-xl border border-border-strong bg-surface-1 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="mono text-xs uppercase tracking-widest text-primary">{m.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{m.bio}</p>
                </div>
                <button
                  onClick={() => remove(m.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <div className="md:col-span-2 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No team members yet.
            </div>
          )}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
          <form
            onSubmit={save}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border-strong bg-background p-6 shadow-elevated"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">New team member</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} required />
            </div>

            <div className="mt-4">
              <label className="mono mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Bio</label>
              <textarea
                required
                rows={4}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Field label="Twitter URL" value={form.twitter} onChange={(v) => setForm({ ...form, twitter: v })} />
              <Field label="GitHub URL" value={form.github} onChange={(v) => setForm({ ...form, github: v })} />
              <Field label="LinkedIn URL" value={form.linkedin} onChange={(v) => setForm({ ...form, linkedin: v })} />
            </div>

            <div className="mt-4">
              <Field
                label="Sort order"
                type="number"
                value={String(form.sort_order)}
                onChange={(v) => setForm({ ...form, sort_order: Number(v) })}
              />
            </div>

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

export default AdminTeam;
