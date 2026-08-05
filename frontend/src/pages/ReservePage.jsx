import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ReservePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    seating: "Indoor",
    specialRequests: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reservations", form);
      toast.success("Reservation submitted successfully");
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        seating: "Indoor",
        specialRequests: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Could not submit reservation",
      );
    }
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
        <h1 className="text-3xl font-semibold text-white">
          Online Table Reservation
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300 leading-8">
          Reserve your table for the perfect night out. Choose your date, time,
          seating preference, and any special requests.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70 md:grid-cols-2"
      >
        <label className="space-y-2 text-sm text-slate-300">
          Full name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Email
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Date
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Time
          <input
            name="time"
            value={form.time}
            onChange={handleChange}
            type="time"
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Guests
          <select
            name="guests"
            value={form.guests}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} guest{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Seating
          <select
            name="seating"
            value={form.seating}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
          >
            <option>Indoor</option>
            <option>Outdoor</option>
          </select>
        </label>
        <label className="col-span-full space-y-2 text-sm text-slate-300">
          Special requests
          <textarea
            name="specialRequests"
            value={form.specialRequests}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
            rows="4"
            placeholder="Dietary needs, seating notes, celebration requests"
          />
        </label>
        <button
          type="submit"
          className="col-span-full rounded-full bg-rose-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-rose-400"
        >
          Send Reservation Request
        </button>
      </form>
    </div>
  );
}

export default ReservePage;
