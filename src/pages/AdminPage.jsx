import { useProducts } from '../hooks/useProducts';
import { useState, useEffect } from 'react';
import Navbar from '../components/public/Navbar';
import AdminHeader from '../components/admin/AdminHeader';
import FormData from '../components/admin/FormData';
import DataTable from '../components/admin/DataTable';

export default function AdminPage() {
  
  // STATE PRODUCTS - menggunakan hook untuk mendapatkan data dari API dengan loading dan error states
  const { products, loading, error, addProduct, deleteProduct, refreshProducts } = useProducts();

  // STATE untuk cache total stok dan nilai inventori (tidak berubah saat edit)
  const [cachedTotalStock, setCachedTotalStock] = useState(0);
  const [cachedInventoryValue, setCachedInventoryValue] = useState(0);

  // Hitung cache saat products pertama kali load
  useEffect(() => {
    if (products.length > 0 && cachedTotalStock === 0) {
      const totalStock = products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
      const inventoryValue = products.reduce((sum, p) => sum + ((Number(p.price) || 0) * (Number(p.stock) || 0)), 0);
      setCachedTotalStock(totalStock);
      setCachedInventoryValue(inventoryValue);
    }
  }, [products, cachedTotalStock]);

  // FUNGSI TAMBAH PRODUK via API
  // Dipanggil dari FormData saat user submit form
  const handleAddProduct = async (newProduct) => {
    try {
      console.log('Menambah produk baru:', newProduct);
      await addProduct(newProduct);
      alert('Produk berhasil ditambahkan!');
    } catch (err) {
      console.error('Error adding product:', err);
      alert(`Gagal menambahkan produk: ${err.message}`);
    }
  };

  // FUNGSI HAPUS PRODUK via API
  // Dipanggil dari DataTable saat user klik tombol Hapus
  const handleDelete = async (id) => {
    try {
      if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        console.log('Menghapus produk dengan ID:', id);
        await deleteProduct(id);
        alert('Produk berhasil dihapus!');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert(`Gagal menghapus produk: ${err.message}`);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Memuat data produk...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-red-800 font-semibold mb-2">Terjadi Kesalahan</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={refreshProducts}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    // CONTAINER HALAMAN dengan background abu-abu
    <div className="min-h-screen bg-gray-100">
      
      {/* NAVBAR - menu navigasi di atas */}
      <Navbar />
      
      {/* KONTEN UTAMA dengan padding dan max width */}
      <div className="container mx-auto px-4 py-8">
        
        {/* HEADER - banner besar dengan judul dashboard */}
        <AdminHeader />
        
        {/* STATISTIK CARDS - 3 card berisi info ringkas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* CARD 1: Total Produk */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-blue-600 text-sm font-bold uppercase tracking-wide">Total Produk</h3>
            {/* Hitung jumlah produk dari length array */}
            <p className="text-3xl font-bold text-blue-700 mt-2">{products.length}</p>
          </div>
          
          {/* CARD 2: Total Stok */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-blue-600 text-sm font-bold uppercase tracking-wide">Total Stok</h3>
            {/* Jumlahkan semua stok dari setiap produk menggunakan reduce */}
            <p className="text-3xl font-bold text-blue-700 mt-2">
              {cachedTotalStock}
            </p>
          </div>
          
          {/* CARD 3: Nilai Inventori */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-blue-600 text-sm font-bold uppercase tracking-wide">Nilai Inventori</h3>
            {/* Hitung total nilai: harga × stok untuk setiap produk */}
            <p className="text-3xl font-bold text-blue-700 mt-2">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(cachedInventoryValue)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Total nilai semua produk × stok
            </p>
          </div>
        </div>

        {/* FORM TAMBAH PRODUK 
            Props onAddProduct dikirim ke FormData
            Saat form di-submit, handleAddProduct akan dipanggil */}
        <FormData onAddProduct={handleAddProduct} />
        
        {/* TABEL PRODUK 
            Props products = array semua produk untuk ditampilkan
            Props onDelete = fungsi untuk menghapus produk */}
        <DataTable 
          products={products} 
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}