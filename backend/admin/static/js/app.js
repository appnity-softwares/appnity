const API_BASE = "/api/v1";
const page = document.querySelector("[data-admin-page]")?.dataset.adminPage;
const isLoginPage = window.location.pathname === "/admin/login";

const collectionConfigs = {
  projects: {
    endpoint: "/admin/projects",
    entity: "Project",
    createLabel: "New project",
    columns: [
      { key: "title", label: "Project" },
      { key: "category", label: "Category" },
      { key: "year", label: "Year" },
      { key: "is_published", label: "Status", render: (item) => renderStatus(item.is_published, "Published", "Draft") },
    ],
    fields: [
      textField("title", "Title", true),
      textField("slug", "Slug", true),
      textField("category", "Category"),
      textField("client", "Client"),
      textField("year", "Year"),
      textField("duration", "Duration"),
      numberField("sort_order", "Sort order"),
      colorField("accent_color", "Accent color"),
      textAreaField("description", "Description"),
      textAreaField("challenge", "Challenge"),
      textAreaField("solution", "Solution"),
      textAreaField("image_url", "Image URL"),
      listField("tags", "Tags", "React, Go, PostgreSQL"),
      listField("images", "Gallery images", "https://..."),
      listField("results", "Results", "50% faster onboarding"),
      statField("stats", "Stats", "Revenue|₹15Cr+"),
      checkboxField("is_featured", "Featured"),
      checkboxField("is_published", "Published"),
    ],
    normalize(formData) {
      return {
        ...formData,
        sort_order: Number(formData.sort_order || 0),
        tags: splitLines(formData.tags),
        images: splitLines(formData.images),
        results: splitLines(formData.results),
        stats: splitLines(formData.stats).map((row) => {
          const [label, value] = row.split("|");
          return { label: (label || "").trim(), value: (value || "").trim() };
        }).filter((stat) => stat.label || stat.value),
        is_featured: Boolean(formData.is_featured),
        is_published: Boolean(formData.is_published),
      };
    },
    hydrate(item) {
      return {
        ...item,
        tags: (item.tags || []).join("\n"),
        images: (item.images || []).join("\n"),
        results: (item.results || []).join("\n"),
        stats: (item.stats || []).map((stat) => `${stat.label}|${stat.value}`).join("\n"),
      };
    },
  },
  blog: {
    endpoint: "/admin/blog",
    entity: "Post",
    createLabel: "New post",
    columns: [
      { key: "title", label: "Post" },
      { key: "category", label: "Category" },
      { key: "author_name", label: "Author" },
      { key: "is_published", label: "Status", render: (item) => renderStatus(item.is_published, "Published", "Draft") },
    ],
    fields: [
      textField("title", "Title", true),
      textField("slug", "Slug", true),
      textField("category", "Category"),
      textField("author_name", "Author name"),
      textField("author_avatar", "Author avatar URL"),
      textAreaField("excerpt", "Excerpt"),
      textAreaField("content", "Content"),
      textAreaField("image_url", "Cover image URL"),
      listField("tags", "Tags", "React, Shipping"),
      checkboxField("is_featured", "Featured"),
      checkboxField("is_published", "Published"),
    ],
    normalize(formData) {
      return {
        ...formData,
        tags: splitLines(formData.tags),
        is_featured: Boolean(formData.is_featured),
        is_published: Boolean(formData.is_published),
      };
    },
    hydrate(item) {
      return { ...item, tags: (item.tags || []).join("\n") };
    },
  },
  jobs: {
    endpoint: "/admin/jobs",
    entity: "Job",
    createLabel: "New role",
    columns: [
      { key: "title", label: "Role" },
      { key: "team", label: "Team" },
      { key: "location", label: "Location" },
      { key: "is_active", label: "Status", render: (item) => renderStatus(item.is_active, "Open", "Closed") },
    ],
    fields: [
      textField("title", "Title", true),
      textField("slug", "Slug", true),
      textField("team", "Team"),
      textField("location", "Location"),
      textField("job_type", "Job type"),
      textField("salary_range", "Salary range"),
      textAreaField("description", "Description"),
      listField("requirements", "Requirements", "5+ years in product engineering"),
      listField("responsibilities", "Responsibilities", "Lead delivery planning"),
      listField("benefits", "Benefits", "Remote-first"),
      checkboxField("is_active", "Open for applications"),
    ],
    normalize(formData) {
      return {
        ...formData,
        requirements: splitLines(formData.requirements),
        responsibilities: splitLines(formData.responsibilities),
        benefits: splitLines(formData.benefits),
        is_active: Boolean(formData.is_active),
      };
    },
    hydrate(item) {
      return {
        ...item,
        requirements: (item.requirements || []).join("\n"),
        responsibilities: (item.responsibilities || []).join("\n"),
        benefits: (item.benefits || []).join("\n"),
      };
    },
  },
  faqs: {
    endpoint: "/admin/faqs",
    entity: "FAQ",
    createLabel: "New FAQ",
    columns: [
      { key: "question", label: "Question" },
      { key: "category", label: "Category" },
      { key: "sort_order", label: "Order" },
      { key: "is_active", label: "Status", render: (item) => renderStatus(item.is_active, "Live", "Hidden") },
    ],
    fields: [
      textAreaField("question", "Question", true),
      textAreaField("answer", "Answer"),
      textField("category", "Category"),
      numberField("sort_order", "Sort order"),
      checkboxField("is_active", "Visible on website"),
    ],
    normalize(formData) {
      return { ...formData, sort_order: Number(formData.sort_order || 0), is_active: Boolean(formData.is_active) };
    },
  },
  services: {
    endpoint: "/admin/services",
    entity: "Service",
    createLabel: "New service",
    columns: [
      { key: "title", label: "Service" },
      { key: "category", label: "Category" },
      { key: "icon", label: "Icon" },
      { key: "is_active", label: "Status", render: (item) => renderStatus(item.is_active, "Live", "Hidden") },
    ],
    fields: [
      textField("title", "Title", true),
      textField("slug", "Slug", true),
      textField("category", "Category"),
      textField("icon", "Icon key"),
      numberField("sort_order", "Sort order"),
      textAreaField("description", "Description"),
      listField("features", "Feature bullets", "Realtime analytics"),
      checkboxField("is_active", "Visible on website"),
    ],
    normalize(formData) {
      return {
        ...formData,
        sort_order: Number(formData.sort_order || 0),
        features: splitLines(formData.features),
        is_active: Boolean(formData.is_active),
      };
    },
    hydrate(item) {
      return { ...item, features: (item.features || []).join("\n") };
    },
  },
  pricing: {
    endpoint: "/admin/pricing",
    entity: "Tier",
    createLabel: "New tier",
    columns: [
      { key: "title", label: "Tier" },
      { key: "price_display", label: "Price" },
      { key: "sort_order", label: "Order" },
      { key: "is_active", label: "Status", render: (item) => renderStatus(item.is_active, "Live", "Hidden") },
    ],
    fields: [
      textField("title", "Title", true),
      textField("slug", "Slug", true),
      textField("price_display", "Price display"),
      numberField("price_amount", "Price amount"),
      numberField("sort_order", "Sort order"),
      textField("accent_color", "Accent color utility"),
      textField("bg_color", "Background color utility"),
      textAreaField("description", "Description"),
      listField("features", "Features", "Priority support"),
      checkboxField("is_popular", "Mark as popular"),
      checkboxField("is_active", "Visible on website"),
    ],
    normalize(formData) {
      return {
        ...formData,
        price_amount: Number(formData.price_amount || 0),
        sort_order: Number(formData.sort_order || 0),
        features: splitLines(formData.features),
        is_popular: Boolean(formData.is_popular),
        is_active: Boolean(formData.is_active),
      };
    },
    hydrate(item) {
      return { ...item, features: (item.features || []).join("\n") };
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  if (isLoginPage) return;
  if (!localStorage.getItem("token")) {
    window.location.href = "/admin/login";
    return;
  }

  void initializeAdminPage();
});

async function initializeAdminPage() {
  try {
    if (page === "dashboard") await initDashboard();
    if (collectionConfigs[page]) await initCollectionPage(page);
    if (page === "inquiries") await initInquiriesPage();
    if (page === "subscribers") await initSubscribersPage();
    if (page === "content") await initContentPage();
    if (page === "settings") await initSettingsPage();
  } catch (error) {
    console.error(error);
    renderPageError(error instanceof Error ? error.message : "Something went wrong");
  }
}

async function api(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `fixed bottom-6 right-6 z-[70] rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-2xl ${type === "error" ? "bg-rose-600" : "bg-slate-950"}`;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2600);
}

function renderPageError(message) {
  const root = document.querySelector("[data-admin-page]");
  if (!root) return;
  root.innerHTML = `
    <div class="rounded-[28px] border border-rose-200 bg-rose-50 p-6 shadow-sm">
      <div class="text-xs font-bold uppercase tracking-[0.24em] text-rose-700">Admin Error</div>
      <div class="mt-3 text-lg font-bold text-slate-950">Unable to load this admin section.</div>
      <p class="mt-2 text-sm text-slate-600">${escapeHtml(message)}</p>
    </div>
  `;
}

function renderStatus(active, yesLabel, noLabel) {
  return `<span class="inline-flex rounded-full px-3 py-1 text-xs font-bold ${active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}">${active ? yesLabel : noLabel}</span>`;
}

function splitLines(value) {
  return (value || "").split("\n").map((item) => item.trim()).filter(Boolean);
}

function textField(name, label, required = false) {
  return { type: "text", name, label, required };
}

function numberField(name, label) {
  return { type: "number", name, label };
}

function colorField(name, label) {
  return { type: "color", name, label };
}

function textAreaField(name, label, required = false) {
  return { type: "textarea", name, label, required };
}

function listField(name, label, placeholder = "") {
  return { type: "textarea", name, label, placeholder, hint: "One item per line" };
}

function statField(name, label, placeholder = "") {
  return { type: "textarea", name, label, placeholder, hint: "One stat per line as Label|Value" };
}

function checkboxField(name, label) {
  return { type: "checkbox", name, label };
}

async function initDashboard() {
  const root = document.querySelector("[data-admin-page='dashboard']");
  if (!root) return;

  root.innerHTML = `
    <div class="space-y-8">
      <section class="grid gap-5 md:grid-cols-2 xl:grid-cols-5" id="dashboard-stats"></section>
      <section class="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Recent inquiries</div>
              <h2 class="mt-2 text-xl font-extrabold tracking-tight">Pipeline activity</h2>
            </div>
          </div>
          <div id="dashboard-inquiries" class="space-y-3 text-sm text-slate-500">Loading…</div>
        </div>
        <div class="space-y-6">
          <div class="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10">
            <div class="text-xs font-bold uppercase tracking-[0.28em] text-white/40">Control stack</div>
            <h2 class="mt-3 text-2xl font-extrabold tracking-tight">Dynamic website operations</h2>
            <p class="mt-4 text-sm leading-6 text-white/70">Public pages now read from APIs and structured settings, so admin changes can drive both content and collections.</p>
            <div class="mt-6 grid gap-3 text-sm">
              <a class="rounded-2xl bg-white/10 px-4 py-3 font-semibold hover:bg-white/15" href="/admin/content">Edit site content</a>
              <a class="rounded-2xl bg-white/10 px-4 py-3 font-semibold hover:bg-white/15" href="/admin/projects">Manage portfolio</a>
            </div>
          </div>
          <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Collections</div>
            <div id="dashboard-collections" class="mt-4 grid gap-3 text-sm"></div>
          </div>
        </div>
      </section>
    </div>
  `;

  const [statsRes, inquiriesRes, settingsRes] = await Promise.all([
    api("/admin/dashboard"),
    api("/admin/inquiries"),
    api("/admin/settings"),
  ]);

  const stats = statsRes.data || {};
  const statCards = [
    { label: "Projects", value: stats.total_projects || 0, icon: "fa-briefcase" },
    { label: "Blog posts", value: stats.total_blog_posts || 0, icon: "fa-newspaper" },
    { label: "Active jobs", value: stats.active_jobs || 0, icon: "fa-user-tie" },
    { label: "Subscribers", value: stats.total_subscribers || 0, icon: "fa-users" },
    { label: "New inquiries", value: stats.new_inquiries || 0, icon: "fa-envelope-open-text" },
  ];

  document.getElementById("dashboard-stats").innerHTML = statCards.map((card) => `
    <article class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex items-start justify-between">
        <div>
          <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">${card.label}</div>
          <div class="mt-4 text-4xl font-extrabold tracking-tight text-slate-950">${card.value}</div>
        </div>
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <i class="fas ${card.icon}"></i>
        </div>
      </div>
    </article>
  `).join("");

  const inquiries = (inquiriesRes.data || []).slice(0, 6);
  document.getElementById("dashboard-inquiries").innerHTML = inquiries.length ? inquiries.map((item) => `
    <div class="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <div>
        <div class="font-semibold text-slate-900">${item.first_name} ${item.last_name}</div>
        <div class="text-xs uppercase tracking-[0.18em] text-slate-400">${item.email}</div>
      </div>
      ${renderStatus(item.status === "new", "New", item.status || "Open")}
    </div>
  `).join("") : `<div class="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center">No inquiries yet.</div>`;

  const settings = settingsRes.data || {};
  const collections = [
    { label: "Brand", value: settings.general?.site_name || "Appnity Software" },
    { label: "Hero CTA", value: settings.site_content?.home?.hero?.primary_cta_label || "Start a Project" },
    { label: "Footer headline", value: settings.site_content?.footer?.description || "Not configured" },
  ];
  document.getElementById("dashboard-collections").innerHTML = collections.map((item) => `
    <div class="rounded-2xl border border-slate-200 px-4 py-4">
      <div class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">${item.label}</div>
      <div class="mt-2 font-semibold text-slate-900">${item.value}</div>
    </div>
  `).join("");
}

async function initCollectionPage(key) {
  const config = collectionConfigs[key];
  const root = document.querySelector(`[data-admin-page='${key}']`);
  if (!root) return;

  root.innerHTML = `
    <div class="space-y-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Collection manager</div>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight">Manage ${config.entity.toLowerCase()}s</h2>
        </div>
        <button id="open-create-modal" class="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition hover:bg-blue-700">
          <i class="fas fa-plus mr-2"></i>${config.createLabel}
        </button>
      </div>
      <div class="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
        <div class="overflow-hidden rounded-[22px] border border-slate-200">
          <table class="min-w-full divide-y divide-slate-200 text-left">
            <thead class="bg-slate-50">
              <tr>${config.columns.map((column) => `<th class="px-5 py-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">${column.label}</th>`).join("")}<th class="px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Actions</th></tr>
            </thead>
            <tbody id="collection-table" class="divide-y divide-slate-100 text-sm text-slate-600"></tbody>
          </table>
        </div>
      </div>
      ${renderModalShell()}
    </div>
  `;

  document.getElementById("open-create-modal").addEventListener("click", () => {
    openCollectionModal(config);
  });

  await loadCollectionPage(config);
}

async function loadCollectionPage(config) {
  const response = await api(config.endpoint);
  const items = response.data || [];
  const tbody = document.getElementById("collection-table");
  tbody.innerHTML = items.length ? items.map((item) => `
    <tr class="align-top">
      ${config.columns.map((column) => `<td class="px-5 py-4">${column.render ? column.render(item) : escapeHtml(item[column.key])}</td>`).join("")}
      <td class="px-5 py-4">
        <div class="flex justify-end gap-2">
          <button class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700" data-action="edit" data-id="${item.id}">Edit</button>
          <button class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50" data-action="delete" data-id="${item.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="${config.columns.length + 1}" class="px-5 py-16 text-center text-slate-400">No records found.</td></tr>`;

  tbody.querySelectorAll("[data-action='edit']").forEach((button) => {
    button.addEventListener("click", () => {
      const item = items.find((entry) => entry.id === button.dataset.id);
      openCollectionModal(config, config.hydrate ? config.hydrate(item) : item);
    });
  });

  tbody.querySelectorAll("[data-action='delete']").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!window.confirm(`Delete this ${config.entity.toLowerCase()}?`)) return;
      await api(`${config.endpoint}/${button.dataset.id}`, { method: "DELETE" });
      showToast(`${config.entity} deleted`);
      await loadCollectionPage(config);
    });
  });
}

function openCollectionModal(config, item = {}) {
  const modal = ensureModal();
  modal.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-200 px-6 py-5">
      <div>
        <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">${item.id ? "Edit record" : "Create record"}</div>
        <h3 class="mt-2 text-xl font-extrabold tracking-tight">${item.id ? `Update ${config.entity}` : `Create ${config.entity}`}</h3>
      </div>
      <button id="close-modal" class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"><i class="fas fa-xmark"></i></button>
    </div>
    <form id="collection-form" class="max-h-[70vh] overflow-auto px-6 py-6">
      <input type="hidden" name="id" value="${item.id || ""}">
      <div class="grid gap-5 md:grid-cols-2">
        ${config.fields.map((field) => renderField(field, item[field.name])).join("")}
      </div>
      <div class="mt-6 flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
        <button type="button" id="cancel-modal" class="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
        <button type="submit" class="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">${item.id ? "Save changes" : `Create ${config.entity.toLowerCase()}`}</button>
      </div>
    </form>
  `;

  modal.parentElement.classList.remove("hidden");
  modal.parentElement.onclick = (event) => {
    if (event.target === modal.parentElement) closeModal();
  };
  document.getElementById("close-modal").addEventListener("click", closeModal);
  document.getElementById("cancel-modal").addEventListener("click", closeModal);
  document.getElementById("collection-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = event.currentTarget.querySelector("button[type='submit']");
    submitButton.disabled = true;
    try {
      const formData = readForm(event.currentTarget);
      const payload = config.normalize ? config.normalize(formData) : formData;
      const id = formData.id;
      await api(`${config.endpoint}${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      showToast(`${config.entity} saved`);
      closeModal();
      await loadCollectionPage(config);
    } catch (error) {
      showToast(error instanceof Error ? error.message : `Failed to save ${config.entity.toLowerCase()}`, "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

async function initInquiriesPage() {
  const root = document.querySelector("[data-admin-page='inquiries']");
  const response = await api("/admin/inquiries");
  const inquiries = response.data || [];
  root.innerHTML = `
    <div class="space-y-6">
      <div>
        <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Inbox</div>
        <h2 class="mt-2 text-2xl font-extrabold tracking-tight">Client inquiries</h2>
      </div>
      <div class="grid gap-4">
        ${inquiries.map((item) => `
          <article class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div class="text-lg font-bold text-slate-950">${item.first_name} ${item.last_name}</div>
                <div class="mt-1 text-sm text-slate-500">${item.email}${item.company ? ` • ${item.company}` : ""}</div>
              </div>
              ${renderStatus(item.status === "new", "New", item.status || "Open")}
            </div>
            <p class="mt-4 text-sm leading-6 text-slate-600">${escapeHtml(item.message || "")}</p>
            <div class="mt-5 flex justify-end gap-3">
              <button class="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700" data-inquiry-id="${item.id}" data-action="review">Mark reviewed</button>
              <button class="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50" data-inquiry-id="${item.id}" data-action="delete">Delete</button>
            </div>
          </article>
        `).join("") || `<div class="rounded-[28px] border border-dashed border-slate-200 bg-white px-6 py-20 text-center text-slate-400">No inquiries yet.</div>`}
      </div>
    </div>
  `;

  root.querySelectorAll("[data-inquiry-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      const item = inquiries.find((entry) => entry.id === button.dataset.inquiryId);
      if (button.dataset.action === "delete") {
        if (!window.confirm("Delete this inquiry?")) return;
        await api(`/admin/inquiries/${item.id}`, { method: "DELETE" });
        showToast("Inquiry deleted");
        await initInquiriesPage();
        return;
      }
      await api(`/admin/inquiries/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...item, status: "reviewed" }),
      });
      showToast("Inquiry updated");
      await initInquiriesPage();
    });
  });
}

async function initSubscribersPage() {
  const root = document.querySelector("[data-admin-page='subscribers']");
  const response = await api("/admin/subscribers");
  const subscribers = response.data || [];

  root.innerHTML = `
    <div class="space-y-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Audience</div>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight">Subscribers</h2>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">${subscribers.length} total subscribers</div>
      </div>
      <div class="grid gap-3">
        ${subscribers.map((item) => `
          <div class="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <div class="font-semibold text-slate-950">${item.email}</div>
              <div class="text-xs uppercase tracking-[0.18em] text-slate-400">${item.source || "newsletter"}</div>
            </div>
            <div class="flex items-center gap-3">
              ${renderStatus(item.status === "active", "Active", item.status || "Inactive")}
              <button class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50" data-email="${item.email}">Unsubscribe</button>
            </div>
          </div>
        `).join("") || `<div class="rounded-[28px] border border-dashed border-slate-200 bg-white px-6 py-20 text-center text-slate-400">No subscribers yet.</div>`}
      </div>
    </div>
  `;

  root.querySelectorAll("[data-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      await api("/admin/subscribers/unsubscribe", {
        method: "POST",
        body: JSON.stringify({ email: button.dataset.email }),
      });
      showToast("Subscriber updated");
      await initSubscribersPage();
    });
  });
}

async function initContentPage() {
  const root = document.querySelector("[data-admin-page='content']");
  const response = await api("/admin/settings");
  const settings = response.data || {};

  root.innerHTML = `
    <div class="space-y-6">
      <div>
        <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Website CMS</div>
        <h2 class="mt-2 text-2xl font-extrabold tracking-tight">Content Studio</h2>
        <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-500">These settings drive global branding, homepage sections, about/contact/careers copy, footer links, testimonials, and pricing calculator settings.</p>
      </div>
      <form id="content-form" class="space-y-6">
        ${renderSettingsSection("Brand", "general", settings.general || {}, [
          { name: "site_name", label: "Site name" },
          { name: "tagline", label: "Tagline" },
          { name: "email", label: "Email" },
          { name: "phone", label: "Phone" },
          { name: "address", label: "Address", type: "textarea" },
        ])}
        ${renderSettingsSection("Social", "social", settings.social || {}, [
          { name: "twitter", label: "Twitter/X" },
          { name: "github", label: "GitHub" },
          { name: "linkedin", label: "LinkedIn" },
          { name: "instagram", label: "Instagram" },
        ])}
        ${renderJsonEditor("Testimonials", "testimonials", settings.testimonials || [])}
        ${renderJsonEditor("Site Content", "site_content", settings.site_content || {})}
        <div class="flex justify-end">
          <button type="submit" class="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Save content</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("content-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const payload = {
        general: collectScopedFields("general"),
        social: collectScopedFields("social"),
        testimonials: parseJsonField("testimonials"),
        site_content: parseJsonField("site_content"),
      };
      await api("/admin/settings", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      showToast("Content updated");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to update content", "error");
    }
  });
}

async function initSettingsPage() {
  const root = document.querySelector("[data-admin-page='settings']");
  const response = await api("/admin/settings");
  const settings = response.data || {};

  root.innerHTML = `
    <div class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <form id="seo-form" class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">SEO</div>
        <h2 class="mt-2 text-2xl font-extrabold tracking-tight">Search defaults</h2>
        <div class="mt-6 grid gap-5">
          <label class="grid gap-2 text-sm font-semibold text-slate-600">
            Default title
            <input class="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-300" name="default_title" value="${escapeAttribute(settings.seo?.default_title)}">
          </label>
          <label class="grid gap-2 text-sm font-semibold text-slate-600">
            Default description
            <textarea class="min-h-[120px] rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-300" name="default_description">${escapeHtml(settings.seo?.default_description || "")}</textarea>
          </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button class="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Save SEO</button>
        </div>
      </form>

      <form id="password-form" class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Security</div>
        <h2 class="mt-2 text-2xl font-extrabold tracking-tight">Change password</h2>
        <div class="mt-6 grid gap-5">
          <label class="grid gap-2 text-sm font-semibold text-slate-600">
            Current password
            <input type="password" class="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-300" name="current_password">
          </label>
          <label class="grid gap-2 text-sm font-semibold text-slate-600">
            New password
            <input type="password" class="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-300" name="new_password">
          </label>
          <label class="grid gap-2 text-sm font-semibold text-slate-600">
            Confirm new password
            <input type="password" class="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-300" name="confirm_password">
          </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button class="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Update password</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("seo-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await api("/admin/settings", {
        method: "PUT",
        body: JSON.stringify({
          seo: {
            default_title: form.default_title.value,
            default_description: form.default_description.value,
          },
        }),
      });
      showToast("SEO settings updated");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to save SEO settings", "error");
    }
  });

  document.getElementById("password-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.new_password.value !== form.confirm_password.value) {
      showToast("Passwords do not match", "error");
      return;
    }
    try {
      await api("/admin/password", {
        method: "PUT",
        body: JSON.stringify({
          current_password: form.current_password.value,
          new_password: form.new_password.value,
        }),
      });
      form.reset();
      showToast("Password updated");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to update password", "error");
    }
  });
}

function renderModalShell() {
  return `
    <div id="modal-overlay" class="fixed inset-0 z-[60] hidden bg-slate-950/40 p-4">
      <div class="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.25)]">
        <div id="modal-content"></div>
      </div>
    </div>
  `;
}

function ensureModal() {
  const overlay = document.getElementById("modal-overlay");
  return overlay.querySelector("#modal-content");
}

function closeModal() {
  document.getElementById("modal-overlay")?.classList.add("hidden");
}

function renderField(field, value) {
  const baseClasses = "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-300";
  if (field.type === "checkbox") {
    const checked = typeof value === "boolean" ? value : ["is_active", "is_published"].includes(field.name);
    return `<label class="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"><input type="checkbox" name="${field.name}" ${checked ? "checked" : ""}>${field.label}</label>`;
  }
  if (field.type === "textarea") {
    return `<label class="grid gap-2 ${field.name === "content" || field.name === "description" || field.name === "answer" ? "md:col-span-2" : ""} text-sm font-semibold text-slate-600">${field.label}<textarea name="${field.name}" placeholder="${escapeAttribute(field.placeholder || "")}" class="${baseClasses} min-h-[130px]">${escapeHtml(value || "")}</textarea>${field.hint ? `<span class="text-xs font-medium text-slate-400">${field.hint}</span>` : ""}</label>`;
  }
  if (field.type === "color") {
    return `<label class="grid gap-2 text-sm font-semibold text-slate-600">${field.label}<input type="color" name="${field.name}" value="${escapeAttribute(value || "#2563eb")}" class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2"></label>`;
  }
  return `<label class="grid gap-2 text-sm font-semibold text-slate-600">${field.label}<input type="${field.type || "text"}" name="${field.name}" value="${escapeAttribute(value || "")}" ${field.required ? "required" : ""} class="${baseClasses}"></label>`;
}

function readForm(form) {
  const data = Object.fromEntries(new FormData(form));
  form.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    data[checkbox.name] = checkbox.checked;
  });
  return data;
}

function renderSettingsSection(title, scope, values, fields) {
  return `
    <section class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">${title}</div>
      <div class="mt-5 grid gap-5 md:grid-cols-2">
        ${fields.map((field) => field.type === "textarea"
          ? `<label class="grid gap-2 md:col-span-2 text-sm font-semibold text-slate-600">${field.label}<textarea data-scope="${scope}" name="${field.name}" class="min-h-[120px] rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-300">${escapeHtml(values[field.name] || "")}</textarea></label>`
          : `<label class="grid gap-2 text-sm font-semibold text-slate-600">${field.label}<input data-scope="${scope}" name="${field.name}" value="${escapeAttribute(values[field.name] || "")}" class="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-300"></label>`).join("")}
      </div>
    </section>
  `;
}

function renderJsonEditor(title, name, value) {
  return `
    <section class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">${title}</div>
      <textarea id="${name}" class="mt-5 min-h-[420px] w-full rounded-[24px] border border-slate-200 bg-slate-950 px-5 py-4 font-mono text-sm text-white outline-none transition focus:border-blue-300">${escapeHtml(JSON.stringify(value, null, 2))}</textarea>
    </section>
  `;
}

function collectScopedFields(scope) {
  const fields = document.querySelectorAll(`[data-scope='${scope}']`);
  const result = {};
  fields.forEach((field) => {
    result[field.name] = field.value;
  });
  return result;
}

function parseJsonField(id) {
  try {
    return JSON.parse(document.getElementById(id).value || "{}");
  } catch (error) {
    throw new Error(`Invalid JSON in ${id.replaceAll("_", " ")}`);
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}
