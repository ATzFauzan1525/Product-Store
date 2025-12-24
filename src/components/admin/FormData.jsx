// FormData.jsx
// FILE INI BERTUGAS: Menampilkan form untuk menambah produk baru
// User input nama, harga, kategori, stok, dan gambar produk di sini

import { useState } from 'react';
import { PlusCircle, Package, DollarSign, Box, Tag, Image } from 'lucide-react';

// Props: onAddProduct = fungsi dari parent (AdminPage) untuk menambah produk
export default function FormData({ onAddProduct }) {
  
  // STATE FORM - menyimpan data yang user ketik di form
  const [formData, setFormData] = useState({
    name: '',      // nama produk
    price: '',     // harga produk
    category: '',  // kategori produk
    stock: '',     // jumlah stok
    image: ''      // URL gambar produk
  });

  // FUNGSI SUBMIT - dipanggil saat tombol "Tambah Produk" diklik
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    
    // Buat objek produk baru dari data form
    const newProduct = {
      name: formData.name,
      price: Number(formData.price),        // Ubah string jadi number
      category: formData.category,
      stock: Number(formData.stock),        // Ubah string jadi number
      image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' // Pakai gambar default jika kosong
    };
    
    // Kirim produk baru ke parent component (AdminPage)
    onAddProduct(newProduct);
    console.log('Product added:', newProduct);
    
    // RESET FORM - kosongkan semua input setelah submit
    setFormData({
      name: '',
      price: '',
      category: '',
      stock: '',
      image: ''
    });
  };

  // FUNGSI HANDLE CHANGE - dipanggil setiap kali user mengetik di input
  const handleChange = (e) => {
    setFormData({
      ...formData,                      // Copy data lama
      [e.target.name]: e.target.value   // Update field yang berubah
    });
  };

  return (
    // CONTAINER FORM dengan border dan shadow
    <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden border border-gray-100">
      
      {/* HEADER FORM - background biru dengan judul */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 border-b border-blue-800">
        <div className="flex items-center gap-3">
          {/* Icon form */}
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <PlusCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Tambah Produk Baru</h2>
            <p className="text-sm text-blue-100 mt-1">Lengkapi formulir untuk menambahkan produk</p>
          </div>
        </div>
      </div>
      
      {/* ISI FORM - semua input field */}
      <div className="p-6 space-y-5">
        
        {/* INPUT NAMA PRODUK */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Package className="w-4 h-4 text-indigo-600" />
            Nama Produk
          </label>
          <input
            type="text"
            name="name"                    // name harus sama dengan key di state
            value={formData.name}          // value diambil dari state
            onChange={handleChange}        // update state saat user ketik
            required                       // wajib diisi
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
            placeholder="Masukkan nama produk"
          />
        </div>

        {/* GRID 2 KOLOM - Harga & Stok bersebelahan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* INPUT HARGA */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Harga (Rp)
            </label>
            <div className="relative">
              {/* Label "Rp" di dalam input sebelah kiri */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">Rp</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"                     // harga minimal 0
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                placeholder="0"
              />
            </div>
          </div>

          {/* INPUT STOK */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Box className="w-4 h-4 text-blue-600" />
              Stok
            </label>
            <div className="relative">
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"                     // stok minimal 0
                className="w-full px-4 pr-16 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                placeholder="0"
              />
              {/* Label "unit" di dalam input sebelah kanan */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">unit</span>
            </div>
          </div>
        </div>

        {/* SELECT KATEGORI - dropdown pilihan */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Tag className="w-4 h-4 text-purple-600" />
            Kategori
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 bg-white"
          >
            <option value="">Pilih Kategori</option>
            <option value="Electronics">🔌 Electronics</option>
            <option value="Audio">🎧 Audio</option>
            <option value="Wearables">⌚ Wearables</option>
            <option value="Camera">📷 Camera</option>
          </select>
        </div>

        {/* INPUT URL GAMBAR - opsional */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Image className="w-4 h-4 text-pink-600" />
            URL Gambar <span className="text-gray-400 font-normal">(opsional)</span>
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 hover:border-gray-300"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* TOMBOL SUBMIT - mengirim form */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-white py-4 rounded-xl hover:from-blue-900 hover:via-blue-700 hover:to-blue-500 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>
    </div>
  );
}