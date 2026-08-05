import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const fallbackPhotos = [
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=900&q=85",
];
const featured = [
  { _id: "house-negroni", name: "House Negroni", category: "Cocktails", description: "Botanical gin, bitter orange, sweet vermouth.", price: 16, image: fallbackPhotos[0] },
  { _id: "dangi-burrata", name: "Dangi Burrata", category: "Small plates", description: "Charred peaches, basil oil and sourdough.", price: 15, image: fallbackPhotos[2] },
  { _id: "midnight-tiramisu", name: "Midnight Tiramisu", category: "Sweet", description: "Espresso-soaked layers and cocoa cloud.", price: 11, image: fallbackPhotos[3] },
];
function MenuPage() {
  const [items, setItems] = useState([]); const [active, setActive] = useState("All");
  useEffect(() => { axios.get("http://localhost:5000/api/menu").then((r) => setItems(r.data.items || [])).catch(() => setItems([])); }, []);
  const menu = items.length ? items : featured;
  const categories = useMemo(() => ["All", ...new Set(menu.map((item) => item.category))], [menu]);
  const displayed = active === "All" ? menu : menu.filter((item) => item.category === active);
  return <div className="space-y-10">
    <section className="menu-hero rounded-[2rem] p-7 sm:p-12"><p className="eyebrow">Made for lingering</p><h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold text-white sm:text-6xl">Food with a point of view. Drinks with a story.</h1><p className="mt-5 max-w-xl leading-7 text-stone-200">Seasonal plates, familiar favourites and pours worth talking about.</p></section>
    <div className="flex snap-x gap-2 overflow-x-auto pb-2">{categories.map((category) => <button key={category} type="button" onClick={() => setActive(category)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${active === category ? "bg-amber-400 text-stone-950" : "border border-white/15 text-stone-300 hover:border-amber-300 hover:text-white"}`}>{category}</button>)}</div>
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{displayed.map((item, index) => <article key={item._id || item.name} className="menu-card"><div className="overflow-hidden"><img src={item.image || fallbackPhotos[index % fallbackPhotos.length]} alt={item.name} loading="lazy" onError={(event) => { event.currentTarget.src = fallbackPhotos[index % fallbackPhotos.length]; }}/></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">{item.category}</p><h2 className="mt-2 font-serif text-2xl font-bold text-white">{item.name}</h2></div><strong className="text-lg text-amber-300">${Number(item.price).toFixed(2)}</strong></div><p className="mt-3 text-sm leading-6 text-stone-400">{item.description || "A house favourite, prepared with the finest seasonal ingredients."}</p></div></article>)}</section>
  </div>;
}
export default MenuPage;
