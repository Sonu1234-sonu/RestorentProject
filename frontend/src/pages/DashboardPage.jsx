import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API = "https://restorentproject.onrender.com/api";
const sections = {
  users: {
    label: "Users",
    path: "users",
    key: "users",
    create: false,
    fields: ["name", "email", "phone", "role", "status"],
    columns: ["name", "email", "phone", "role", "status", "createdAt"],
  },
  menu: {
    label: "Menu",
    path: "menu",
    key: "items",
    fields: ["name", "price", "category", "description", "image", "available"],
    columns: ["name", "category", "price", "available"],
  },
  reservations: {
    label: "Reservations",
    path: "reservations",
    key: "reservations",
    create: false,
    fields: [
      "name",
      "email",
      "phone",
      "date",
      "time",
      "guests",
      "seating",
      "tableNumber",
      "status",
      "specialRequests",
    ],
    columns: ["name", "date", "time", "guests", "tableNumber", "status"],
  },
  orders: {
    label: "Orders",
    path: "orders",
    key: "orders",
    create: false,
    fields: ["status"],
    columns: ["_id", "items", "total", "deliveryType", "status", "createdAt"],
  },
  inventory: {
    label: "Inventory",
    path: "inventory",
    key: "items",
    fields: ["item", "category", "quantity", "unit", "threshold", "status"],
    columns: ["item", "category", "quantity", "unit", "threshold", "status"],
  },
  events: {
    label: "Events",
    path: "events",
    key: "events",
    fields: [
      "title",
      "description",
      "date",
      "category",
      "imageUrl",
      "videoUrl",
    ],
    columns: ["title", "date", "category", "imageUrl", "videoUrl"],
  },
  coupons: {
    label: "Coupons",
    path: "coupons",
    key: "coupons",
    fields: ["code", "discountType", "discountValue", "expiresAt", "active"],
    columns: ["code", "discountType", "discountValue", "expiresAt", "active"],
  },
  reviews: {
    label: "Reviews",
    path: "reviews",
    key: "reviews",
    create: false,
    fields: ["status"],
    columns: ["name", "rating", "comment", "status", "createdAt"],
  },
  employees: {
    label: "Employees",
    path: "employees",
    key: "employees",
    fields: ["name", "role", "email", "phone", "status"],
    columns: ["name", "role", "email", "phone", "status"],
  },
  messages: {
    label: "Messages",
    path: "contacts",
    key: "contacts",
    create: false,
    fields: ["read"],
    columns: ["name", "email", "subject", "message", "read", "createdAt"],
  },
};
const statuses = {
  status: [
    "active",
    "blocked",
    "available",
    "low",
    "out",
    "Pending",
    "Confirmed",
    "Preparing",
    "Ready",
    "Completed",
    "Cancelled",
    "Rejected",
    "visible",
    "hidden",
    "spam",
    "inactive",
  ],
  role: ["user", "admin", "Bartender", "Cashier", "Chef", "Waiter"],
  seating: ["Indoor", "Outdoor"],
  discountType: ["percentage", "fixed"],
};
const sidebarIcons = {
  overview: "◈",
  users: "◉",
  menu: "⌘",
  reservations: "◷",
  orders: "▣",
  inventory: "◫",
  events: "✦",
  coupons: "◇",
  reviews: "★",
  employees: "♙",
  messages: "✉",
};
const title = (field) =>
  field.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
const isToday = (value) =>
  value && new Date(value).toDateString() === new Date().toDateString();
const format = (field, value) => {
  if (value === undefined || value === null || value === "") return "—";
  if (field === "items")
    return value.map((item) => `${item.name} ×${item.quantity}`).join(", ");
  if (["price", "subtotal", "total"].includes(field))
    return `₹${Number(value).toLocaleString("en-IN")}`;
  if (field === "createdAt" || field === "date" || field === "expiresAt")
    return new Date(value).toLocaleDateString("en-IN");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [active, setActive] = useState("overview");
  const [data, setData] = useState({});
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("barToken");
  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token],
  );
  const load = async () => {
    try {
      const requests = Object.entries(sections).map(async ([name, config]) => [
        name,
        (
          await axios.get(`${API}/${config.path}`, {
            headers: config.path === "menu" ? undefined : headers,
          })
        ).data[config.key] || [],
      ]);
      const result = Object.fromEntries(await Promise.all(requests));
      setData(result);
    } catch (err) {
      setError(err.response?.data?.error || "Could not load admin data.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("barToken");
    navigate("/login");
  };

  useEffect(() => {
    (async () => {
      if (!token) {
        setError("Please login with an admin account.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API}/auth/profile`, { headers });
        if (response.data.user.role !== "admin")
          throw new Error("Admin access required.");
        setProfile(response.data.user);
        await load();
      } catch (err) {
        setError(
          err.response?.data?.error || err.message || "Admin access required.",
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);
  const save = async (event) => {
    event.preventDefault();
    const config = sections[active];
    const form = Object.fromEntries(new FormData(event.currentTarget));
    ["available", "active", "read"].forEach((key) => {
      if (config.fields.includes(key)) form[key] = form[key] === "true";
    });
    ["price", "quantity", "threshold", "guests", "discountValue"].forEach(
      (key) => {
        if (form[key] !== undefined && form[key] !== "")
          form[key] = Number(form[key]);
      },
    );
    try {
      if (editing?._id) {
        const method = active === "reviews" ? "patch" : "put";
        await axios[method](`${API}/${config.path}/${editing._id}`, form, {
          headers,
        });
        toast.success("Saved successfully");
      } else {
        await axios.post(`${API}/${config.path}`, form, { headers });
        toast.success("Created successfully");
      }
      setEditing(null);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.error || "Could not save changes");
    }
  };
  const remove = async (item) => {
    if (!window.confirm("Permanently delete this record?")) return;
    try {
      await axios.delete(`${API}/${sections[active].path}/${item._id}`, {
        headers,
      });
      toast.success("Deleted");
      await load();
    } catch (err) {
      toast.error(err.response?.data?.error || "Could not delete record");
    }
  };
  const toggleBlock = async (item) => {
    const action = item.status === "blocked" ? "unblock" : "block";
    try {
      await axios.patch(`${API}/users/${item._id}/${action}`, {}, { headers });
      toast.success(`User ${action}ed`);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.error || "User action failed");
    }
  };
  const stats = {
    customers: (data.users || []).length,
    reservations: (data.reservations || []).length,
    todayReservations: (data.reservations || []).filter((item) =>
      isToday(item.date),
    ).length,
    orders: (data.orders || []).length,
    todaySales: (data.orders || [])
      .filter((item) => isToday(item.createdAt) && item.status !== "Cancelled")
      .reduce((sum, item) => sum + (item.total ?? item.subtotal), 0),
    monthlyRevenue: (data.orders || [])
      .filter((item) => {
        const date = new Date(item.createdAt),
          now = new Date();
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear() &&
          item.status !== "Cancelled"
        );
      })
      .reduce((sum, item) => sum + (item.total ?? item.subtotal), 0),
    menu: (data.menu || []).length,
    lowStock: (data.inventory || []).filter(
      (item) =>
        item.status === "low" ||
        item.status === "out" ||
        item.quantity <= item.threshold,
    ).length,
    events: (data.events || []).filter(
      (item) => new Date(item.date) >= new Date(),
    ).length,
  };
  if (loading)
    return (
      <div className="rounded-3xl bg-stone-900 p-8 text-stone-300">
        Loading admin dashboard…
      </div>
    );
  if (error)
    return (
      <div className="rounded-3xl border border-red-400/30 bg-red-950/30 p-8 text-red-200">
        {error}
      </div>
    );
  const config = sections[active];
  const rows = (data[active] || []).filter((item) =>
    JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-6 pb-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-stone-900 via-stone-900 to-rose-950/40 p-6 shadow-2xl shadow-black/20 sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Admin
              control centre
            </p>
            <p className="text-xs font-medium text-stone-400">
              Live restaurant overview
            </p>
          </div>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Good to see you, {profile?.name}.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
                Keep every service detail moving smoothly from one elegant
                workspace.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={load}
                className="rounded-full border border-amber-300/30 bg-stone-950/40 px-5 py-2.5 text-sm font-bold text-amber-100 transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-300 hover:text-stone-950"
              >
                Refresh data
              </button>
              <button
                onClick={handleLogout}
                className="rounded-full border border-amber-300/30 bg-transparent px-5 py-2.5 text-sm font-bold text-amber-100 transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-300/10 hover:text-rose-100"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 shadow-2xl shadow-black/25 lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-7rem)] lg:flex-col">
          <div className="border-b border-white/10 bg-gradient-to-br from-amber-300/15 via-transparent to-rose-400/10 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400 font-serif text-lg font-black text-stone-950 shadow-lg shadow-amber-400/20">
                D
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300">
                  Admin space
                </p>
                <p className="mt-1 font-serif text-lg font-bold text-white">
                  Dangi Restorent
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-stone-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
              Signed in as {profile?.name || "Administrator"}
            </div>
          </div>
          <nav
            className="flex gap-2 overflow-x-auto p-3 scrollbar-none lg:block lg:min-h-0 lg:flex-1 lg:space-y-1 lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2"
            aria-label="Dashboard sections"
          >
            <button
              onClick={() => {
                setActive("overview");
                setEditing(null);
              }}
              className={`group flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition duration-200 lg:w-full ${active === "overview" ? "bg-amber-400 text-stone-950 shadow-lg shadow-amber-400/15" : "text-stone-300 hover:bg-white/10 hover:text-white"}`}
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-lg text-base ${active === "overview" ? "bg-stone-950/10" : "bg-white/5 text-amber-300 group-hover:bg-amber-300/10"}`}
              >
                {sidebarIcons.overview}
              </span>
              Dashboard
            </button>
            <p className="hidden px-4 pb-2 pt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 lg:block">
              Management
            </p>
            <div className="flex gap-2 lg:block lg:space-y-1">
              {Object.entries(sections).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActive(key);
                    setEditing(null);
                  }}
                  className={`group flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition duration-200 lg:w-full ${active === key ? "bg-amber-400 text-stone-950 shadow-lg shadow-amber-400/15" : "text-stone-300 hover:bg-white/10 hover:text-white"}`}
                >
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-lg text-base ${active === key ? "bg-stone-950/10" : "bg-white/5 text-amber-300 group-hover:bg-amber-300/10"}`}
                  >
                    {sidebarIcons[key]}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </aside>
        <main>
          {active === "overview" ? (
            <Overview stats={stats} data={data} setActive={setActive} />
          ) : (
            <Management
              config={config}
              rows={rows}
              query={query}
              setQuery={setQuery}
              editing={editing}
              setEditing={setEditing}
              save={save}
              remove={remove}
              toggleBlock={toggleBlock}
            />
          )}
        </main>
      </div>
    </div>
  );
}
function Overview({ stats, data, setActive }) {
  const cards = [
    ["Total customers", stats.customers],
    ["Total reservations", stats.reservations],
    ["Today’s reservations", stats.todayReservations],
    ["Total orders", stats.orders],
    ["Today’s sales", `₹${stats.todaySales.toLocaleString("en-IN")}`],
    ["Monthly revenue", `₹${stats.monthlyRevenue.toLocaleString("en-IN")}`],
    ["Menu items", stats.menu],
    ["Low stock items", stats.lowStock],
    ["Upcoming events", stats.events],
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value], index) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-br from-stone-900 to-stone-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-300/35 hover:shadow-xl hover:shadow-black/20"
          >
            <div className="absolute -right-3 -top-4 text-6xl font-serif text-amber-300/[0.06] transition group-hover:scale-110 group-hover:text-amber-300/[0.12]">
              0{index + 1}
            </div>
            <p className="relative text-sm font-medium text-stone-400">
              {label}
            </p>
            <p className="relative mt-2 font-serif text-3xl font-bold text-white">
              {value}
            </p>
            <div className="relative mt-4 h-px w-10 bg-gradient-to-r from-amber-300 to-transparent transition-all duration-300 group-hover:w-16" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Quick
          title="Needs attention"
          items={(data.inventory || []).filter(
            (item) =>
              item.status === "low" ||
              item.status === "out" ||
              item.quantity <= item.threshold,
          )}
          render={(item) =>
            `${item.item}: ${item.quantity} ${item.unit} remaining`
          }
          action={() => setActive("inventory")}
        />
        <Quick
          title="Upcoming reservations"
          items={(data.reservations || [])
            .filter((item) => new Date(item.date) >= new Date())
            .slice(0, 5)}
          render={(item) =>
            `${item.name} · ${format("date", item.date)} · ${item.time}`
          }
          action={() => setActive("reservations")}
        />
      </div>
    </div>
  );
}
function Quick({ title, items, render, action }) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-stone-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-white">{title}</h2>
        <button onClick={action} className="text-sm font-bold text-amber-300">
          Manage →
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {items.length ? (
          items.map((item) => (
            <p
              key={item._id}
              className="rounded-xl bg-stone-800 p-3 text-sm text-stone-300"
            >
              {render(item)}
            </p>
          ))
        ) : (
          <p className="text-sm text-stone-400">Nothing to review right now.</p>
        )}
      </div>
    </section>
  );
}
function Management({
  config,
  rows,
  query,
  setQuery,
  editing,
  setEditing,
  save,
  remove,
  toggleBlock,
}) {
  return (
    <div className="space-y-5">
      <section className="rounded-[1.5rem] border border-white/10 bg-stone-900 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-3xl font-bold text-white">
              {config.label}
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              {rows.length} record{rows.length === 1 ? "" : "s"}
            </p>
          </div>
          {config.create !== false && (
            <button
              onClick={() => setEditing({})}
              className="rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-stone-950"
            >
              Add {config.label.slice(0, -1)}
            </button>
          )}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search ${config.label.toLowerCase()}...`}
          className="mt-4 w-full rounded-xl border border-white/10 bg-stone-800 px-4 py-3 text-sm text-white outline-none focus:border-amber-300"
        />
      </section>
      {editing && (
        <Editor
          config={config}
          item={editing}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      )}
      <section className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-stone-900">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-stone-800 text-stone-400">
              <tr>
                {config.columns.map((field) => (
                  <th key={field} className="px-4 py-3 font-semibold">
                    {title(field)}
                  </th>
                ))}
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-white/10 text-stone-200"
                >
                  {config.columns.map((field) => (
                    <td key={field} className="max-w-xs px-4 py-3">
                      {field === "status" ? (
                        <span className="rounded-full bg-amber-300/10 px-2 py-1 text-xs font-bold text-amber-300">
                          {format(field, item[field])}
                        </span>
                      ) : (
                        format(field, item[field])
                      )}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3">
                    <button
                      onClick={() => setEditing(item)}
                      className="mr-2 text-xs font-bold text-amber-300"
                    >
                      Edit
                    </button>
                    {config.path === "users" && (
                      <button
                        onClick={() => toggleBlock(item)}
                        className="mr-2 text-xs font-bold text-orange-300"
                      >
                        {item.status === "blocked" ? "Unblock" : "Block"}
                      </button>
                    )}
                    <button
                      onClick={() => remove(item)}
                      className="text-xs font-bold text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td
                    colSpan={config.columns.length + 1}
                    className="px-4 py-8 text-center text-stone-400"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
function Editor({ config, item, onCancel, onSave }) {
  return (
    <form
      onSubmit={onSave}
      className="rounded-[1.5rem] border border-amber-300/30 bg-stone-900 p-5"
    >
      <div className="flex justify-between gap-3">
        <h3 className="font-serif text-2xl font-bold text-white">
          {item._id ? "Edit" : "Add"} {config.label.slice(0, -1)}
        </h3>
        <button type="button" onClick={onCancel} className="text-stone-400">
          ×
        </button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {config.fields.map((field) => (
          <label key={field} className="text-sm text-stone-300">
            {title(field)}
            {statuses[field] ? (
              <select
                name={field}
                defaultValue={item[field] ?? statuses[field][0]}
                className="mt-1 block w-full rounded-xl border border-white/10 bg-stone-800 px-3 py-2 text-white"
              >
                {statuses[field].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : ["available", "active", "read"].includes(field) ? (
              <select
                name={field}
                defaultValue={String(item[field] ?? true)}
                className="mt-1 block w-full rounded-xl border border-white/10 bg-stone-800 px-3 py-2 text-white"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            ) : (
              <input
                name={field}
                type={
                  field === "date" || field === "expiresAt"
                    ? "date"
                    : [
                          "price",
                          "quantity",
                          "threshold",
                          "guests",
                          "discountValue",
                        ].includes(field)
                      ? "number"
                      : "text"
                }
                defaultValue={
                  field === "date" || field === "expiresAt"
                    ? item[field]
                      ? new Date(item[field]).toISOString().slice(0, 10)
                      : ""
                    : (item[field] ?? "")
                }
                required={[
                  "name",
                  "item",
                  "title",
                  "code",
                  "price",
                  "quantity",
                  "discountValue",
                ].includes(field)}
                className="mt-1 block w-full rounded-xl border border-white/10 bg-stone-800 px-3 py-2 text-white"
              />
            )}
          </label>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        <button className="rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-stone-950">
          Save changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-bold text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default DashboardPage;
