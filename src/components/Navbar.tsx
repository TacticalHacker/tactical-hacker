import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0d1117] border-b border-[#00bfa6]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="text-[#00bfa6] font-bold text-xl">Tactical Hacker</span>
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-[#00bfa6] focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              stroke="#00bfa6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {/* Desktop links */}
        <div className="hidden sm:flex space-x-4">
          <NavLink to="/" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"}>About</NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"}>Projects</NavLink>
          <NavLink to="/youtube" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"}>YouTube</NavLink>
          <NavLink to="/blog" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"}>Blog</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"}>Contact</NavLink>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2">
            <NavLink to="/" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/projects" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"} onClick={() => setOpen(false)}>Projects</NavLink>
            <NavLink to="/youtube" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"} onClick={() => setOpen(false)}>YouTube</NavLink>
            <NavLink to="/blog" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"} onClick={() => setOpen(false)}>Blog</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? "text-[#00bfa6]" : "text-white"} onClick={() => setOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;