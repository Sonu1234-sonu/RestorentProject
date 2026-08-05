import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-16 text-center shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-300">
        Page not found
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-white">
        Oops, we couldn’t find that page.
      </h1>
      <p className="mt-4 text-slate-300">
        Return to the homepage to explore our cocktails, events, and
        reservations.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-rose-400"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
