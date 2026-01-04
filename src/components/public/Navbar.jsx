import { Link, NavLink } from "react-router-dom";
import { Search } from 'lucide-react';

export default function Navbar({ searchQuery, onSearch }) {
  return (
    <nav className="sticky top-0 z-50">
      {/* Soft Blue Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-sky-400/20 to-cyan-400/20 blur-2xl opacity-60"></div>

      <div className="relative bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            
            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-3 text-xl font-extrabold tracking-tight"
            >
              <span className="text-3xl">🛒</span>
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                ProductStore
              </span>
            </Link>

            {/* SEARCH BAR - only show if onSearch is provided */}
            {onSearch && (
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Cari produk..."
                    className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* MENU */}
            <div className="flex items-center gap-10 text-sm font-semibold">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative transition-all duration-300
                  ${
                    isActive
                      ? "text-blue-700"
                      : "text-slate-500 hover:text-blue-600"
                  }
                  after:absolute after:left-1/2 after:-bottom-2 after:h-1 after:w-0
                  after:-translate-x-1/2 after:rounded-full
                  after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400
                  after:transition-all after:duration-300
                  ${isActive ? "after:w-8" : "hover:after:w-8"}
                  `
                }
              >
                Katalog
              </NavLink>

              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `relative transition-all duration-300
                  ${
                    isActive
                      ? "text-blue-700"
                      : "text-slate-500 hover:text-blue-600"
                  }
                  after:absolute after:left-1/2 after:-bottom-2 after:h-1 after:w-0
                  after:-translate-x-1/2 after:rounded-full
                  after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400
                  after:transition-all after:duration-300
                  ${isActive ? "after:w-8" : "hover:after:w-8"}
                  `
                }
              >
                Admin
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
