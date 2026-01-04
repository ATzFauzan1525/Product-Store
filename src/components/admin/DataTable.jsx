// DataTable.jsx
// FILE INI BERTUGAS: Menampilkan tabel daftar semua produk
// User bisa lihat detail produk, edit, dan menghapus produk dari sini

import { Trash2, Package, Edit } from 'lucide-react';
import { useState } from 'react';

// Props: 
// - products = array berisi semua produk
// - onDelete = fungsi untuk menghapus produk
// - onEdit = fungsi untuk update produk yang sudah ada
export default function DataTable({ products, onDelete, onEdit }) {
  
  // STATE untuk mengontrol modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // STATE untuk form input edit
  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: ''
  });

  // FUNGSI FORMAT HARGA - mengubah angka jadi format Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // FUNGSI BUKA MODAL EDIT - isi form dengan data produk yang dipilih
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image
    });
    setIsEditModalOpen(true);
  };

  // FUNGSI TUTUP MODAL - reset semua state
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
    setEditForm({
      name: '',
      category: '',
      price: '',
      stock: '',
      image: ''
    });
  };

  // FUNGSI SUBMIT EDIT - kirim data update ke parent component
  const handleSubmitEdit = () => {
    // Validasi: semua field harus diisi
    if (!editForm.name || !editForm.category || !editForm.price || !editForm.stock || !editForm.image) {
      alert('Semua field harus diisi!');
      return;
    }

    // Panggil fungsi onEdit dari parent dengan data produk yang sudah diupdate
    onEdit({
      ...editingProduct,
      name: editForm.name,
      category: editForm.category,
      price: Number(editForm.price),
      stock: Number(editForm.stock),
      image: editForm.image
    });

    // Tutup modal setelah berhasil
    handleCloseModal();
  };

  return (
    <>
      {/* CONTAINER TABEL dengan shadow dan border */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* HEADER TABEL - background biru dengan judul */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Daftar Produk</h2>
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
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-blue-50 transition-all duration-200">
                  
                  {/* KOLOM ID */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-blue-600">
                      {product.id}
                    </span>
                  </td>
                  
                  {/* KOLOM PRODUK */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  
                  {/* KOLOM KATEGORI */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {product.category}
                    </span>
                  </td>
                  
                  {/* KOLOM HARGA */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  
                  {/* KOLOM STOK */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.stock > 50 ? 'bg-green-500' : product.stock > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm text-gray-700 font-medium">
                        {product.stock} unit
                      </span>
                    </div>
                  </td>
                  
                  {/* KOLOM AKSI - tombol edit dan hapus */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {/* TOMBOL EDIT */}
                      <button
                        onClick={() => handleEditClick(product)}
                        className="group flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <Edit className="w-4 h-4 group-hover:animate-pulse" />
                        <span className="font-semibold">Edit</span>
                      </button>
                      
                      {/* TOMBOL HAPUS */}
                      <button
                        onClick={() => onDelete(product.id)}
                        className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <Trash2 className="w-4 h-4 group-hover:animate-pulse" />
                        <span className="font-semibold">Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* TAMPILAN KOSONG */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Belum ada produk</p>
          </div>
        )}
      </div>

      {/* MODAL EDIT PRODUK */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* HEADER MODAL */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 border-b border-orange-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <Edit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Edit Produk</h3>
                    <p className="text-sm text-orange-100 mt-1">
                      Update informasi produk {editingProduct?.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* FORM EDIT */}
            <div className="p-6 space-y-6">
              
              {/* INPUT NAMA PRODUK */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all"
                  placeholder="Contoh: iPhone 15 Pro Max"
                />
              </div>

              {/* INPUT KATEGORI */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Kategori
                </label>
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all"
                  placeholder="Contoh: Smartphone"
                />
              </div>

              {/* INPUT HARGA */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all"
                  placeholder="Contoh: 25000000"
                />
              </div>

              {/* INPUT STOK */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Stok
                </label>
                <input
                  type="number"
                  value={editForm.stock}
                  onChange={(e) => setEditForm({...editForm, stock: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all"
                  placeholder="Contoh: 50"
                />
              </div>

              {/* INPUT URL GAMBAR */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  URL Gambar
                </label>
                <input
                  type="text"
                  value={editForm.image}
                  onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* PREVIEW GAMBAR */}
              {editForm.image && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Preview Gambar
                  </label>
                  <img 
                    src={editForm.image} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-xl shadow-md"
                  />
                </div>
              )}

              {/* TOMBOL AKSI */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmitEdit}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}