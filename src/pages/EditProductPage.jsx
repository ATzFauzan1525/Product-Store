import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Package, DollarSign, Box, Tag, Image } from 'lucide-react';
import Navbar from '../components/public/Navbar';
import { getProductById, formatProductFromApi, updateProduct } from '../services/api';

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    description: '',
    isAvailable: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(id);
        const formattedProduct = formatProductFromApi(productData);
        setProduct(formattedProduct);
        setFormData({
          name: formattedProduct.name,
          price: formattedProduct.price.toString(),
          category: formattedProduct.category,
          stock: formattedProduct.stock.toString(),
          image: formattedProduct.image,
          description: formattedProduct.description || '',
          isAvailable: formattedProduct.isAvailable
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Produk tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedProduct = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        description: formData.description,
        isAvailable: formData.isAvailable
      };

      await updateProduct(id, updatedProduct);
      alert('Produk berhasil diupdate!');
      navigate('/admin');
    } catch (err) {
      console.error('Error updating product:', err);
      alert(`Gagal mengupdate produk: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Memuat produk...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-red-800 font-semibold mb-2">Terjadi Kesalahan</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/admin')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Kembali ke Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard Admin
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Produk</h1>
          <p className="text-gray-600 mt-1">Update informasi produk ID: {id}</p>
        </div>

        {/* Preview Data Sebelumnya */}
        {product && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Data Produk Saat Ini</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600">ID Produk</p>
                <p className="text-lg font-medium text-gray-900">{product.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600">Nama Produk</p>
                <p className="text-lg font-medium text-gray-900">{product.name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600">Kategori</p>
                <p className="text-lg font-medium text-gray-900">{product.category}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600">Harga</p>
                <p className="text-lg font-medium text-gray-900">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  }).format(product.price)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600">Stok</p>
                <p className="text-lg font-medium text-gray-900">{product.stock} unit</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600">Status</p>
                <p className={`text-lg font-medium ${product.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {product.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600">Gambar</p>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
              </div>
            </div>
            {product.description && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-gray-600">Deskripsi</p>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 border-b border-orange-600">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Edit Produk</h2>
                <p className="text-sm text-orange-100 mt-1">Perbarui detail produk</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* ID Produk (Readonly) */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                🆔 ID Produk
              </label>
              <input
                type="text"
                value={id}
                readOnly
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Nama Produk */}
            <div>
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Masukkan nama produk"
              />
            </div>

            {/* Grid 2 kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Harga */}
              <div>
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
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Stok */}
              <div>
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
                    className="w-full px-4 pr-16 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">unit</span>
                </div>
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Tag className="w-4 h-4 text-purple-600" />
                Kategori
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                placeholder="Masukkan kategori produk"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                📝 Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                placeholder="Masukkan deskripsi produk"
              />
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                ✅ Status Produk
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                  className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="text-gray-700">Produk tersedia untuk dijual</span>
              </div>
            </div>

            {/* URL Gambar */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Image className="w-4 h-4 text-pink-600" />
                URL Gambar
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Preview Gambar */}
            {formData.image && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preview Gambar</label>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl shadow-md border border-gray-200"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';
                  }}
                />
              </div>
            )}

            {/* Tombol Submit */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Menyimpan...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2 inline" />
                    Simpan Perubahan
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}