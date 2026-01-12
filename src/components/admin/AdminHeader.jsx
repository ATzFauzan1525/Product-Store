import { TrendingUp, Package, Box, DollarSign, LogOut, ShoppingCart } from "lucide-react";

export default function AdminHeader({
  totalProducts = 0,
  totalStock = 0,
  inventoryValue = 0,
  totalSold = 0,
  onLogout,
}) {
  return (
    // Container utama header dengan gradient biru dan shadow besar
    <div className="relative bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 text-white p-12 rounded-3xl shadow-2xl mb-12 overflow-hidden">
      {/* ELEMEN DEKORATIF - Lingkaran putih di pojok kanan atas untuk efek visual */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full -mr-40 -mt-40"></div>

      {/* ELEMEN DEKORATIF - Lingkaran biru di pojok kiri bawah untuk efek visual */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 opacity-20 rounded-full -ml-32 -mb-32"></div>

      {/* KONTEN UTAMA - z-10 agar muncul di atas elemen dekoratif */}
      <div className="relative z-10">
        {/* JUDUL DASHBOARD - Icon Package + text "Admin Dashboard" */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Icon Package dalam box transparan dengan blur effect */}
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-2xl">
              <Package className="w-12 h-12 text-white" />
            </div>
            {/* Judul utama */}
            <h1 className="text-5xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-xl transition-all duration-200"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>

        {/* SUBTITLE - Keterangan fungsi dashboard dengan icon trending */}
        <p className="text-purple-50 text-xl flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Kelola produk dan monitor toko Anda dengan mudah
        </p>

        {/* MINI STATS - Card kecil menampilkan statistik lengkap */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card Total Produk */}
          <div className="bg-white bg-opacity-15 backdrop-blur-md px-6 py-4 rounded-xl border border-white border-opacity-20">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-purple-100" />
              <p className="text-sm text-purple-100 font-medium">
                Total Produk
              </p>
            </div>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </div>

          {/* Card Total Stok */}
          <div className="bg-white bg-opacity-15 backdrop-blur-md px-6 py-4 rounded-xl border border-white border-opacity-20">
            <div className="flex items-center gap-3 mb-2">
              <Box className="w-5 h-5 text-purple-100" />
              <p className="text-sm text-purple-100 font-medium">Total Stok</p>
            </div>
            <p className="text-3xl font-bold">{totalStock}</p>
          </div>

          {/* Card Nilai Inventori */}
          <div className="bg-white bg-opacity-15 backdrop-blur-md px-6 py-4 rounded-xl border border-white border-opacity-20">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-purple-100" />
              <p className="text-sm text-purple-100 font-medium">
                Nilai Inventori
              </p>
            </div>
            <p className="text-xl font-bold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(inventoryValue)}
            </p>
          </div>

          {/* Card Status */}
          <div className="bg-white bg-opacity-15 backdrop-blur-md px-6 py-4 rounded-xl border border-white border-opacity-20">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-100" />
              <p className="text-sm text-purple-100 font-medium">Status</p>
            </div>
            <p className="text-lg font-semibold">Online</p>
          </div>

          {/* Card Produk Terjual */}
          <div className="bg-white bg-opacity-15 backdrop-blur-md px-6 py-4 rounded-xl border border-white border-opacity-20">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="w-5 h-5 text-purple-100" />
              <p className="text-sm text-purple-100 font-medium">
                Produk Terjual
              </p>
            </div>
            <p className="text-3xl font-bold">{totalSold}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
