function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:px-8 lg:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-slate-100">Dangi Restorent</p>
          <p className="mt-3 text-sm leading-7">
            The city’s warmest bar for cocktails, happy hours, and live events.
            Open daily from 4pm until midnight.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Phone: (555) 123-4567</li>
            <li>Email: hello@dangirestorent.com</li>
            <li>Address: 88 Sunset Blvd, Downtown</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Follow Us
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <a
              href="#"
              className="rounded-full bg-slate-900 px-3 py-2 hover:bg-slate-800"
            >
              Instagram
            </a>
            <a
              href="#"
              className="rounded-full bg-slate-900 px-3 py-2 hover:bg-slate-800"
            >
              Facebook
            </a>
            <a
              href="#"
              className="rounded-full bg-slate-900 px-3 py-2 hover:bg-slate-800"
            >
              X
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
        © 2026 Dangi Restorent. Designed for memorable dining.
      </div>
    </footer>
  );
}

export default Footer;
