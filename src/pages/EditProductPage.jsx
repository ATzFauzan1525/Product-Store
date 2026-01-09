import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Package,
  DollarSign,
  Box,
  Tag,
  Image,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/public/Navbar';
import {
  getProductById,
  formatProductFromApi,
  updateProduct
} from '../services/api';

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
          price: String(formattedProduct.price),
          category: formattedProduct.category,
          stock: String(formattedProduct.stock),
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
        image:
          formData.image ||
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
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

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    let processedValue = value;

    if (type === 'checkbox') {
      processedValue = checked;
    } else if (name === 'stock' || name === 'price') {
      processedValue = value.replace(/[^0-9]/g, '');
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: processedValue };

      if (name === 'stock') {
        updated.isAvailable = Number(processedValue) > 0;
      }

      return updated;
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-600 font-semibold mb-6">{error}</p>
          <button
            onClick={() => navigate('/admin')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-8">

            <input
              type="text"
              value={id}
              readOnly
              className="w-full px-5 py-4 border-2 rounded-xl bg-gray-100 text-gray-500"
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border-2 rounded-xl"
              placeholder="Nama Produk"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border-2 rounded-xl"
              placeholder="Harga"
            />

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border-2 rounded-xl"
              placeholder="Stok"
            />

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border-2 rounded-xl"
              placeholder="Kategori"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 rounded-xl"
              rows="4"
              placeholder="Deskripsi produk"
            />

            <div
              className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                formData.isAvailable
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <label className="flex items-center gap-4 p-6 cursor-pointer">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-6 h-6"
                />
                <span className="font-semibold">
                  Produk {formData.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                </span>
              </label>
            </div>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 rounded-xl"
              placeholder="URL Gambar"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
