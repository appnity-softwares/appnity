import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, X, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/services/api";

interface Member {
  id: string;
  full_name: string;
  role: string;
  bio: string;
  photo?: string;
  social_links: any;
  order_index: number;
}

const empty = { 
  id: "",
  full_name: "", 
  role: "", 
  bio: "", 
  photo: "",
  twitter: "", 
  github: "", 
  linkedin: "", 
  order_index: 0 
};

const AdminTeam = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getTeam();
      setMembers(data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to load team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Team · Admin";
    load();
  }, []);

  const openEdit = (m: Member) => {
    setEditingId(m.id);
    const links = typeof m.social_links === 'string' ? JSON.parse(m.social_links) : m.social_links;
    setForm({
      ...empty,
      id: m.id,
      full_name: m.full_name,
      role: m.role,
      bio: m.bio,
      photo: m.photo || "",
      twitter: links?.twitter || "",
      github: links?.github || "",
      linkedin: links?.linkedin || "",
      order_index: m.order_index,
    });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const social_links: Record<string, string> = {};
    if (form.twitter) social_links.twitter = form.twitter;
    if (form.github) social_links.github = form.github;
    if (form.linkedin) social_links.linkedin = form.linkedin;

    const payload = {
      full_name: form.full_name.trim(),
      role: form.role.trim(),
      bio: form.bio.trim(),
      photo: form.photo.trim(),
      social_links,
      order_index: Number(form.order_index),
      is_visible: true
    };

    try {
      if (editingId) {
        await adminApi.updateTeamMember(editingId, payload);
        toast.success("Team member updated");
      } else {
        await adminApi.createTeamMember(payload);
        toast.success("Team member added");
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
    if (!confirm("Delete this team member?")) return;
    try {
      await adminApi.deleteTeamMember(id);
      toast.success("Deleted");
      setMembers((m) => m.filter((x) => x.id !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-muted-foreground">People</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Team</h1>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setForm(empty);
            setOpen(true);
          }}
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
            <div key={m.id} className="rounded-xl border border-border-strong bg-surface-1 p-5 group transition-all hover:border-primary/30">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{m.full_name}</h3>
                  <p className="mono text-xs uppercase tracking-widest text-primary">{m.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{m.bio}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(m)}
                    className="text-muted-foreground hover:text-primary"
                    aria-label="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => remove(m.id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
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
              <h2 className="text-xl font-semibold">{editingId ? "Edit member" : "New member"}</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} required />
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

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Photo URL" value={form.photo} onChange={(v) => setForm({ ...form, photo: v })} />
              <Field
                label="Sort order"
                type="number"
                value={String(form.order_index)}
                onChange={(v) => setForm({ ...form, order_index: Number(v) })}
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

export default AdminTeam;
