import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import FormData from '../components/admin/FormData';
import { useProducts } from '../hooks/useProducts';

export default function AddProductPage() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (product) => {
    try {
      setIsSubmitting(true);
      await addProduct(product);
      alert('Produk berhasil ditambahkan!');
      navigate('/admin');
    } catch (err) {
      console.error('Error adding product:', err);
      alert(`Gagal menambahkan produk: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Tambah Produk</h1>
          <p className="text-sm text-gray-600">Isi formulir untuk menambahkan produk baru.</p>
        </div>

        <FormData onAddProduct={handleAdd} />
      </div>
    </div>
  );
}
