import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submitContact = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await axios.post("http://localhost:5000/api/contacts", form);
      toast.success("Message sent successfully");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Could not send your message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
        <h1 className="text-3xl font-semibold text-white">Contact</h1>
        <p className="mt-4 max-w-3xl text-slate-300 leading-8">
          Reach out for reservations, events, or general inquiries. We’re happy
          to help you plan your visit.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-300">
              Get in touch
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Visit Dangi Restorent
            </h2>
          </div>
          <ul className="space-y-4 text-slate-300">
            <li>
              <span className="font-semibold text-white">Phone:</span> (555)
              123-4567
            </li>
            <li>
              <span className="font-semibold text-white">Email:</span>{" "}
              hello@dangirestorent.com
            </li>
            <li>
              <span className="font-semibold text-white">Address:</span> 88
              Sunset Blvd, Downtown
            </li>
          </ul>
          <div className="rounded-[1.75rem] bg-slate-900/80 p-6 text-slate-400">
            <p className="font-semibold text-white">Opening Hours</p>
            <p className="mt-3">Mon–Thu: 4pm–12am</p>
            <p>Fri–Sun: 4pm–2am</p>
          </div>
        </div>

        <form onSubmit={submitContact} className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
          <label className="space-y-2 text-sm text-slate-300">
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
              placeholder="Your name"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Subject
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={(event) => setForm({ ...form, subject: event.target.value })}
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
              placeholder="How can we help?"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Message
            <textarea
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
              name="message"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              rows="5"
              placeholder="How can we help?"
              required
            />
          </label>
          <button disabled={submitting} className="rounded-full bg-rose-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
