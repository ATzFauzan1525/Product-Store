import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
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
