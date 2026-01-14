import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Navbar({
  searchQuery,
  onSearch,
  cart = [],
  onCartClick,
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="sticky top-0 z-50">
      {/* Soft Blue Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-sky-400/20 to-cyan-400/20 blur-2xl opacity-60 dark:from-blue-600/20 dark:via-sky-600/20 dark:to-cyan-600/20"></div>

      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-blue-100 dark:border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-3 text-xl font-extrabold tracking-tight"
            >
              <span className="text-3xl">🛒</span>
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-sky-400 dark:to-cyan-400">
                ProductStore
              </span>
            </Link>

            {/* SEARCH BAR - only show if onSearch is provided */}
            {onSearch && (
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Cari produk..."
                    className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }
                  after:absolute after:left-1/2 after:-bottom-2 after:h-1 after:w-0
                  after:-translate-x-1/2 after:rounded-full
                  after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400 dark:after:from-blue-400 dark:after:to-cyan-400
                  after:transition-all after:duration-300
                  ${isActive ? "after:w-8" : "hover:after:w-8"}
                  `
                }
              >
                Katalog
              </NavLink>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>

              {/* Cart Icon */}
              <div className="relative">
                <button
                  onClick={onCartClick}
                  className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
