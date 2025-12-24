// DataTable.jsx
// FILE INI BERTUGAS: Menampilkan tabel daftar semua produk
// User bisa lihat detail produk dan menghapus produk dari sini

import { Trash2, Package } from 'lucide-react';

// Props: 
// - products = array berisi semua produk
// - onDelete = fungsi untuk menghapus produk
export default function DataTable({ products, onDelete }) {
  
  // FUNGSI FORMAT HARGA - mengubah angka jadi format Rupiah
  // Contoh: 25000000 → Rp 25.000.000
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0  // Tanpa angka desimal
    }).format(price);
  };

  return (
    // CONTAINER TABEL dengan shadow dan border
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      
      {/* HEADER TABEL - background biru dengan judul */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 border-b border-blue-800">
        <div className="flex items-center gap-3">
          {/* Icon tabel */}
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Daftar Produk</h2>
            {/* Menampilkan jumlah total produk */}
            <p className="text-sm text-blue-100 mt-1">Total: {products.length} produk</p>
          </div>
        </div>
      </div>
      
      {/* WRAPPER TABLE - bisa scroll horizontal di layar kecil */}
      <div className="overflow-x-auto">
        <table className="w-full">
          
          {/* KEPALA TABEL - nama-nama kolom */}
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Produk
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Harga
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Stok
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          
          {/* ISI TABEL - looping semua produk */}
          <tbody className="bg-white divide-y divide-gray-100">
            {/* MAP - menampilkan setiap produk sebagai 1 baris */}
            {products.map((product) => (
              // Setiap baris punya key unique (product.id)
              // Hover baris akan berubah warna jadi biru muda
              <tr key={product.id} className="hover:bg-blue-50 transition-all duration-200">
                
                {/* KOLOM ID - menampilkan ID produk */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-blue-600">
                    {product.id}
                  </span>
                </td>
                
                {/* KOLOM PRODUK - menampilkan gambar + nama produk */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {/* Container gambar dengan badge hijau di pojok kanan bawah */}
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover shadow-md"
                      />
                      {/* Badge hijau = produk tersedia */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    {/* Nama produk */}
                    <span className="text-sm font-semibold text-gray-900">
                      {product.name}
                    </span>
                  </div>
                </td>
                
                {/* KOLOM KATEGORI - badge dengan background biru */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {product.category}
                  </span>
                </td>
                
                {/* KOLOM HARGA - format Rupiah */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                </td>
                
                {/* KOLOM STOK - dengan indikator warna */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {/* DOT INDIKATOR:
                        - Hijau jika stok > 50
                        - Kuning jika stok 21-50
                        - Merah jika stok <= 20 */}
                    <div className={`w-2 h-2 rounded-full ${product.stock > 50 ? 'bg-green-500' : product.stock > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    {/* Jumlah stok */}
                    <span className="text-sm text-gray-700 font-medium">
                      {product.stock} unit
                    </span>
                  </div>
                </td>
                
                {/* KOLOM AKSI - tombol hapus */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onDelete(product.id)}  // Panggil fungsi hapus dengan ID produk
                    className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    {/* Icon sampah yang beranimasi pulse saat hover */}
                    <Trash2 className="w-4 h-4 group-hover:animate-pulse" />
                    <span className="font-semibold">Hapus</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* TAMPILAN KOSONG - muncul jika tidak ada produk */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Belum ada produk</p>
        </div>
      )}
    </div>
  );
}