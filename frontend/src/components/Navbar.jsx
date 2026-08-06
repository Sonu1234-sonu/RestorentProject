import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Our story" },
  { to: "/menu", label: "Menu" },
  { to: "/order", label: "Order online" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

const navClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition ${
    isActive ? "bg-amber-400 text-stone-950" : "text-stone-300 hover:bg-white/10 hover:text-white"
  }`;

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("barToken") : null;
  const closeMenu = () => setOpen(false);
  const handleLogout = () => { localStorage.removeItem("barToken"); closeMenu(); navigate("/"); };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-stone-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" onClick={closeMenu} className="group shrink-0">
          <span className="block font-serif text-xl font-bold tracking-[0.04em] text-amber-300 transition group-hover:text-amber-200">Dangi Restorent</span>
          <span className="block text-[9px] font-semibold tracking-[0.32em] text-stone-400">RESTAURANT & KITCHEN</span>
        </NavLink>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          {token && <NavLink to="/profile" className="rounded-full px-3 py-2 text-sm font-medium text-stone-300 hover:text-white">Profile</NavLink>}
          {token && <NavLink to="/dashboard" className="rounded-full px-3 py-2 text-sm font-medium text-stone-300 hover:text-white">Dashboard</NavLink>}
          {token ? <button onClick={handleLogout} className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-amber-300">Log out</button> : <NavLink to="/login" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-amber-300">Log in</NavLink>}
          <NavLink to="/reserve" className="rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-stone-950 transition hover:bg-amber-300">Reserve a table</NavLink>
        </div>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xl text-white lg:hidden">{open ? "×" : "☰"}</button>
      </div>
      {open && <div className="border-t border-white/10 bg-stone-950 px-4 py-4 lg:hidden">
        <nav className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
          {links.map((link) => <NavLink key={link.to} to={link.to} onClick={closeMenu} className={navClass}>{link.label}</NavLink>)}
          {token && <NavLink to="/dashboard" onClick={closeMenu} className={navClass}>Dashboard</NavLink>}
          <NavLink to="/reserve" onClick={closeMenu} className="mt-2 rounded-full bg-amber-400 px-4 py-2 text-center text-sm font-bold text-stone-950">Reserve a table</NavLink>
        </nav>
      </div>}
    </header>
  );
}

export default Navbar;
