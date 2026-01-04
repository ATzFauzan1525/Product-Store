import { useState, useEffect } from 'react';
import { X, Save, Package, DollarSign, Box, Tag, Image } from 'lucide-react';

export default function EditModal({ isOpen, onClose, product, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });

  // Update form data ketika product berubah atau modal dibuka
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        stock: product.stock?.toString() || '',
        image: product.image || ''
      });
    }
  }, [product, isOpen]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProduct = {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock),
      image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
    };
    
    onSave(product.id, updatedProduct);
    onClose();
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 border-b border-blue-800 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Edit Produk</h2>
                  <p className="text-sm text-blue-100 mt-1">Ubah detail produk yang sudah ada</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-5">
            
            {/* Product Info Display */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">ID Produk: <span className="font-bold text-blue-600">#{product?.id}</span></p>
              <p className="text-sm text-gray-600">Foto saat ini:</p>
              {product?.image && (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover mt-2 border border-gray-300"
                />
              )}
            </div>

            {/* INPUT NAMA PRODUK */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Package className="w-4 h-4 text-indigo-600" />
                Nama Produk
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
                placeholder="Masukkan nama produk"
              />
            </div>

            {/* GRID 2 KOLOM - Harga & Stok */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* INPUT HARGA */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Harga (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">Rp</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
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
                    min="0"
                    className="w-full px-4 pr-16 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">unit</span>
                </div>
              </div>
            </div>

            {/* SELECT KATEGORI */}
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

            {/* INPUT URL GAMBAR */}
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
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

