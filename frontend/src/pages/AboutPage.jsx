function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90 p-8 shadow-2xl shadow-slate-950/40 ring-1 ring-slate-700/70">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-rose-300">
              The story behind the flavour
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              A dining experience shaped by passion, warmth, and unforgettable
              evenings.
            </h1>
            <p className="mt-6 max-w-3xl text-slate-300 leading-8">
              Dangi Restorent opened with a passion for elevated dining,
              immersive events, and warm hospitality. Our mission is to create a
              venue where every guest feels welcome and every night becomes an
              experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-rose-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-rose-300">
                Premium hospitality
              </span>
              <span className="rounded-full bg-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                Live events
              </span>
              <span className="rounded-full bg-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                Crafted menus
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/70 shadow-xl shadow-slate-950/40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,82,82,0.17),_transparent_34%)]" />
            <img
              src="https://images.unsplash.com/photo-1541544180-21d1bfc6808f?auto=format&fit=crop&w=1000&q=80"
              alt="Restaurant interior"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/0 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-rose-300">
                Crafted atmosphere
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Warm nights, glowing tables, and signature flavor.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Our Story",
            content:
              "From craft cocktails to live music, Dangi Restorent was founded by hospitality veterans who love connection and celebration.",
            accent: "Founders' vision",
          },
          {
            title: "Mission & Vision",
            content:
              "We aim to be the neighborhood destination for memorable nights, seasonal menus, and unforgettable moments.",
            accent: "Bold ambition",
          },
          {
            title: "Awards",
            content:
              "Best Cocktail Bar 2025, Top Live Music Venue 2024, Community Choice for ambiance and service.",
            accent: "Recognized excellence",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="group overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/75 p-6 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:bg-slate-900/90"
          >
            <div className="mb-4 inline-flex rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-rose-300">
              {item.accent}
            </div>
            <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-4 text-slate-300 leading-7">{item.content}</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
              <span className="inline-flex h-2 w-2 rounded-full bg-rose-400" />
              <span>Designed for unforgettable evenings.</span>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Meet the team</h2>
            <p className="mt-2 max-w-2xl text-slate-400">
              The team behind every great meal, toast, and celebration.
            </p>
          </div>
          <button className="inline-flex items-center rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 transition hover:bg-rose-400">
            View full story
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Ava Brooks", role: "Head Mixologist" },
            { name: "Leo Grant", role: "General Manager" },
            { name: "Nina Hart", role: "Events Curator" },
            { name: "Milo Stone", role: "Chef de Cuisine" },
          ].map((person) => (
            <div
              key={person.name}
              className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-rose-500"
            >
              <div className="mx-auto mb-5 h-24 w-24 rounded-full bg-gradient-to-br from-rose-500 to-slate-700 shadow-inner shadow-rose-600/20" />
              <h3 className="text-lg font-semibold text-white">
                {person.name}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">
                {person.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
