// FormData.jsx
// FILE INI BERTUGAS: Menampilkan form untuk menambah produk baru
// User input nama, harga, kategori, stok, deskripsi, dan gambar produk di sini

import { useState } from 'react';
import { PlusCircle, Package, DollarSign, Box, Tag, Image, FileText } from 'lucide-react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// Props: onAddProduct = fungsi dari parent (AdminPage) untuk menambah produk
export default function FormData({ onAddProduct }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // STATE FORM - menyimpan data yang user ketik di form
  const [formData, setFormData] = useState({
    name: '',         // nama produk
    price: '',        // harga produk
    category: '',     // kategori produk
    stock: '',        // jumlah stok
    description: '',  // deskripsi produk
    image: ''         // URL gambar produk
  });

  // FUNGSI SUBMIT - dipanggil saat tombol "Tambah Produk" diklik
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    
    // Set loading state
    setIsSubmitting(true);
    
    try {
      // Buat objek produk baru dari data form
      const newProduct = {
        name: formData.name,
        price: Number(formData.price),        // Ubah string jadi number
        category: formData.category,
        stock: Number(formData.stock),        // Ubah string jadi number
        description: formData.description,
        image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' // Pakai gambar default jika kosong
      };
      
      // Kirim produk baru ke parent component (AdminPage)
      await onAddProduct(newProduct);
      console.log('Product added:', newProduct);
      
      // RESET FORM - kosongkan semua input setelah submit berhasil
      setFormData({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: '',
        image: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      // Error handling is done in parent component
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-blue-100/40 rounded-3xl shadow-2xl mb-8 overflow-hidden border-2 border-white backdrop-blur-sm">
      
      {/* HEADER FORM - background gradient biru */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 p-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative flex items-center gap-4">
          {/* Icon form dengan animasi */}
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/30">
            <PlusCircle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Tambah Produk Baru</h2>
            <p className="text-base text-blue-100 mt-1 font-medium">Lengkapi formulir untuk menambahkan produk</p>
          </div>
        </div>
      </div>
      
      {/* ISI FORM - semua input field */}
      <div className="p-8 space-y-6">
        
        {/* INPUT NAMA PRODUK */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Package className="w-4 h-4 text-white" />
            </div>
            Nama Produk
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Masukkan nama produk"
            className="h-14 px-5 text-base font-medium border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-lg bg-white"
          />
        </div>

        {/* GRID 2 KOLOM - Harga & Stok bersebelahan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* INPUT HARGA */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              Harga
            </label>
            <div className="relative">
              {/* Label "Rp" di dalam input sebelah kiri */}
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-lg z-10">Rp</span>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="h-14 pl-16 pr-5 text-base font-semibold border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-lg bg-white"
                placeholder="0"
              />
            </div>
          </div>

          {/* INPUT STOK */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Box className="w-4 h-4 text-white" />
              </div>
              Stok
            </label>
            <div className="relative">
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="h-14 px-5 pr-20 text-base font-semibold border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-lg bg-white"
                placeholder="0"
              />
              {/* Label "unit" di dalam input sebelah kanan */}
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 text-base font-bold">unit</span>
            </div>
          </div>
        </div>

        {/* INPUT KATEGORI - sekarang text input */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Tag className="w-4 h-4 text-white" />
            </div>
            Kategori
          </label>
          <Input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Contoh: Electronics, Audio, Wearables"
            className="h-14 px-5 text-base font-medium border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-lg bg-white"
          />
        </div>

        {/* INPUT DESKRIPSI - textarea */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <FileText className="w-4 h-4 text-white" />
            </div>
            Deskripsi Produk
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Jelaskan detail produk, fitur, dan spesifikasinya..."
            className="w-full px-5 py-4 text-base font-medium border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-lg bg-white resize-none"
          />
        </div>

        {/* INPUT URL GAMBAR - opsional */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Image className="w-4 h-4 text-white" />
            </div>
            URL Gambar <span className="text-gray-400 font-medium ml-1">(opsional)</span>
          </label>
          <Input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="h-14 px-5 text-base font-medium border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-lg bg-white"
          />
        </div>

        {/* TOMBOL SUBMIT - super modern dengan gradient biru dan animasi */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="group relative w-full h-16 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-700 hover:via-blue-600 hover:to-blue-800 text-white rounded-2xl transition-all duration-500 font-black text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:scale-[1.02] hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden border-0"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Pulse background */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent relative z-10"></div>
              <span className="relative z-10 tracking-wide">Menambah Produk...</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-6 h-6 relative z-10 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500" />
              <span className="relative z-10 tracking-wide">Tambah Produk</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}