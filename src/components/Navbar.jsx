// Navbar.jsx
import React from "react";

function Navbar({ isMobile }) {
  return (
    <nav className="flex justify-between items-center bg-purple-500 text-white py-3 px-4 md:px-8 shadow-md">
      <div className="logo">
        <span className="font-bold text-xl md:text-2xl">TaskChanger</span>
      </div>
      <ul className="flex gap-4 md:gap-8">
        <li className="cursor-pointer hover:font-bold transition-all duration-200 px-2 py-1 rounded hover:bg-indigo-700">
          {isMobile ? "🏠" : "Home"}
        </li>
        <li className="cursor-pointer hover:font-bold transition-all duration-200 px-2 py-1 rounded hover:bg-indigo-700">
          {isMobile ? "📝" : "Your Tasks"}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
