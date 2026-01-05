import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Package, DollarSign, Box, Tag, Image, Sparkles } from 'lucide-react';
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
        stock: formData.isAvailable ? Number(formData.stock) : 0,
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Memuat Data Produk</h3>
            <p className="text-gray-500">Mohon tunggu sebentar...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-red-100">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops! Terjadi Kesalahan</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
                  <button
                    onClick={() => navigate('/admin')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Kembali ke Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Header Section */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/admin')}
            className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Kembali ke Dashboard</span>
          </button>
          
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-10 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black text-white">Edit Produk</h1>
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
                <p className="text-blue-100 text-lg font-medium">Perbarui informasi produk • ID: {id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-10">
            <div className="space-y-8">
              
              {/* ID Produk */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  ID Produk
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={id}
                    readOnly
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-500 cursor-not-allowed font-semibold text-lg"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-full">
                    READ ONLY
                  </div>
                </div>
              </div>

              {/* Nama Produk */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Nama Produk
                </label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 font-medium placeholder:text-gray-400"
                    placeholder="Contoh: iPhone 15 Pro Max"
                  />
                </div>
              </div>

              {/* Grid Layout - Harga & Stok */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Harga */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Harga Produk
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    <span className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-600 font-bold">Rp</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full pl-20 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-gray-800 font-semibold placeholder:text-gray-400"
                      placeholder="500000"
                    />
                  </div>
                </div>

                {/* Stok */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Jumlah Stok
                  </label>
                  <div className="relative">
                    <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      disabled={!formData.isAvailable}
                      className="w-full pl-12 pr-20 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-gray-800 font-semibold placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                      placeholder="100"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-lg">
                      UNIT
                    </div>
                  </div>
                </div>
              </div>

              {/* Kategori */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Kategori Produk
                </label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 font-medium placeholder:text-gray-400"
                    placeholder="Contoh: Elektronik, Fashion, Gadget"
                  />
                </div>
              </div>

              {/* Deskripsi */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  Deskripsi Produk
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-gray-800 font-medium placeholder:text-gray-400 resize-none"
                  placeholder="Ceritakan lebih detail tentang produk ini..."
                />
              </div>

              {/* Status Ketersediaan */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Status Ketersediaan
                </label>
                <div className={`relative overflow-hidden rounded-2xl border-2 transition-all ${formData.isAvailable ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <label className="flex items-start gap-4 p-6 cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        name="isAvailable"
                        checked={formData.isAvailable}
                        onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                        className="w-6 h-6 text-emerald-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-emerald-200 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-900 font-bold text-lg">Produk Tersedia</span>
                        {formData.isAvailable && (
                          <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                            AKTIF
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {formData.isAvailable 
                          ? '✓ Produk akan ditampilkan di katalog dan dapat dibeli oleh pelanggan' 
                          : '✗ Produk tidak akan ditampilkan dan stok otomatis menjadi 0'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* URL Gambar */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  URL Gambar Produk
                </label>
                <div className="relative">
                  <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all text-gray-800 font-medium placeholder:text-gray-400"
                    placeholder="https://example.com/gambar-produk.jpg"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">Masukkan URL gambar produk dari internet</p>
              </div>

              {/* Preview Gambar */}
              {formData.image && (
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Preview Gambar
                  </label>
                  <div className="inline-block relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-20"></div>
                    <div className="relative bg-white p-3 rounded-2xl border-2 border-gray-200 shadow-lg">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t-2 border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan Perubahan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 bg-white text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all border-2 border-gray-200 shadow-sm hover:shadow-lg transform hover:scale-105"
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