import { useState } from "react";

const gallery = [
  ["Dining room", "Spaces", "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85"],
  ["A table for two", "Spaces", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"],
  ["Dangi cocktails", "Drinks", "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85"],
  ["Golden hour", "Drinks", "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=85"],
  ["Chef's table", "Kitchen", "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"],
  ["Freshly plated", "Kitchen", "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=85"],
  ["Late-night energy", "Events", "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85"],
  ["Gather round", "Events", "https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=1200&q=85"],
];

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const categories = ["All", "Spaces", "Drinks", "Kitchen", "Events"];
  const visible = filter === "All" ? gallery : gallery.filter((item) => item[1] === filter);
  return <div className="space-y-10">
    <section className="gallery-hero rounded-[2rem] p-7 sm:p-12"><p className="eyebrow">The Dangi journal</p><h1 className="mt-3 max-w-xl font-serif text-4xl font-bold text-white sm:text-6xl">A little taste of the good life.</h1><p className="mt-5 max-w-xl leading-7 text-stone-200">From candlelit dinners to bright cocktails, discover the moments that make Dangi Restorent feel like home.</p></section>
    <div className="flex flex-wrap gap-2">{categories.map((category) => <button key={category} type="button" onClick={() => setFilter(category)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === category ? "bg-amber-400 text-stone-950" : "border border-white/15 text-stone-300 hover:border-amber-300 hover:text-white"}`}>{category}</button>)}</div>
    <section className="gallery-grid">{visible.map(([title, category, image], index) => <button key={title} type="button" onClick={() => setSelected({ title, image })} className={`gallery-card group ${index === 0 || index === 5 ? "gallery-card--tall" : ""}`}><img src={image} alt={title} loading="lazy"/><span><small>{category}</small><strong>{title}</strong><b>View photo ↗</b></span></button>)}</section>
    {selected && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4" role="dialog" aria-modal="true" onClick={() => setSelected(null)}><div className="relative max-h-full max-w-4xl" onClick={(event) => event.stopPropagation()}><img className="max-h-[82vh] rounded-2xl object-contain" src={selected.image} alt={selected.title}/><button onClick={() => setSelected(null)} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-2xl text-white">×</button><p className="mt-3 text-center font-serif text-xl text-white">{selected.title}</p></div></div>}
  </div>;
}
export default GalleryPage;
