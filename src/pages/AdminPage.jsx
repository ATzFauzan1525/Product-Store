import { useProducts } from '../hooks/useProducts';
import Navbar from '../components/public/Navbar';
import AdminHeader from '../components/admin/AdminHeader';
import FormData from '../components/admin/FormData';
import DataTable from '../components/admin/DataTable';

export default function AdminPage() {
  
  // STATE PRODUCTS - menggunakan hook untuk mendapatkan data dari localStorage
  const { products, addProduct, deleteProduct, updateProduct } = useProducts();

  // FUNGSI TAMBAH PRODUK
  // Dipanggil dari FormData saat user submit form
  const handleAddProduct = (newProduct) => {
    console.log('Menambah produk baru:', newProduct);
    addProduct(newProduct);
    alert('Produk berhasil ditambahkan!');
  };

  // FUNGSI HAPUS PRODUK
  // Dipanggil dari DataTable saat user klik tombol Hapus
  const handleDelete = (id) => {
    console.log('Menghapus produk dengan ID:', id);
    deleteProduct(id);
    alert('Produk berhasil dihapus!');
  };

  // ✨ FUNGSI EDIT PRODUK (BARU)
  // Dipanggil dari DataTable saat user submit form edit
  const handleEditProduct = (updatedProduct) => {
    console.log('Mengupdate produk:', updatedProduct);
    updateProduct(updatedProduct);
    alert('Produk berhasil diupdate!');
  };

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
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </p>
          </div>
          
          {/* CARD 3: Nilai Inventori */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-blue-600 text-sm font-bold uppercase tracking-wide">Nilai Inventori</h3>
            {/* Hitung total nilai: harga × stok untuk setiap produk
                Dibagi 1 juta untuk tampil dalam jutaan
                toFixed(0) untuk bulatkan tanpa desimal */}
            <p className="text-3xl font-bold text-blue-700 mt-2">
              Rp {(products.reduce((sum, p) => sum + (p.price * p.stock), 0) / 1000000).toFixed(0)}jt
            </p>
          </div>
        </div>

        {/* FORM TAMBAH PRODUK 
            Props onAddProduct dikirim ke FormData
            Saat form di-submit, handleAddProduct akan dipanggil */}
        <FormData onAddProduct={handleAddProduct} />
        
        {/* TABEL PRODUK 
            Props products = array semua produk untuk ditampilkan
            Props onDelete = fungsi untuk menghapus produk
            Props onEdit = fungsi untuk edit produk (BARU) */}
        <DataTable 
          products={products} 
          onDelete={handleDelete}
          onEdit={handleEditProduct}
        />
      </div>
    </div>
  );
}