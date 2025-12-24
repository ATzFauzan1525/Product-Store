// AdminHeader.jsx
// FILE INI BERTUGAS: Menampilkan header/banner besar di bagian atas halaman admin
// Fungsinya sebagai judul dan informasi ringkas dashboard

import { TrendingUp, Package } from 'lucide-react';

export default function AdminHeader() {
  return (
    // Container utama header dengan gradient biru dan shadow besar
    <div className="relative bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 text-white p-8 rounded-2xl shadow-2xl mb-8 overflow-hidden">
      
      {/* ELEMEN DEKORATIF - Lingkaran putih di pojok kanan atas untuk efek visual */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
      
      {/* ELEMEN DEKORATIF - Lingkaran biru di pojok kiri bawah untuk efek visual */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300 opacity-20 rounded-full -ml-24 -mb-24"></div>
      
      {/* KONTEN UTAMA - z-10 agar muncul di atas elemen dekoratif */}
      <div className="relative z-10">
        
        {/* JUDUL DASHBOARD - Icon Package + text "Admin Dashboard" */}
        <div className="flex items-center gap-3 mb-3">
          {/* Icon Package dalam box transparan dengan blur effect */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl">
            <Package className="w-8 h-8 text-white" />
          </div>
          {/* Judul utama */}
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        </div>
        
        {/* SUBTITLE - Keterangan fungsi dashboard dengan icon trending */}
        <p className="text-purple-50 text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Kelola produk dan monitor toko Anda dengan mudah
        </p>
        
        {/* MINI STATS - Card kecil menampilkan Total Produk dan Status */}
        <div className="mt-6 flex gap-4">
          {/* Card Total Produk - nilai "-" karena belum terhubung dengan data real */}
          <div className="bg-white bg-opacity-15 backdrop-blur-md px-4 py-2 rounded-lg border border-white border-opacity-20">
            <p className="text-xs text-purple-100">Total Produk</p>
            <p className="text-2xl font-bold">-</p>
          </div>
          
          {/* Card Status - menampilkan status "Online" */}
          <div className="bg-white bg-opacity-15 backdrop-blur-md px-4 py-2 rounded-lg border border-white border-opacity-20">
            <p className="text-xs text-purple-100">Status</p>
            <p className="text-sm font-semibold">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}