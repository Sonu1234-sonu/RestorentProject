function ContactPage() {
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

        <form className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
          <label className="space-y-2 text-sm text-slate-300">
            Name
            <input
              type="text"
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
              placeholder="Your name"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Email
            <input
              type="email"
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
              placeholder="you@example.com"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Message
            <textarea
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100"
              rows="5"
              placeholder="How can we help?"
            />
          </label>
          <button className="rounded-full bg-rose-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-rose-400">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
