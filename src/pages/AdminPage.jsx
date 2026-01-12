import { useProducts } from "../hooks/useProducts";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/public/Navbar";
import AdminHeader from "../components/admin/AdminHeader";
import DataTable from "../components/admin/DataTable";

export default function AdminPage() {
  const navigate = useNavigate();

  // STATE PRODUCTS - menggunakan hook untuk mendapatkan data dari API dengan loading dan error states
  const { products, loading, error, deleteProduct, refreshProducts } =
    useProducts();

  // STATE untuk total stok dan nilai inventori (dihitung saat products berubah)
  const { totalStock, inventoryValue, totalSold } = useMemo(() => {
    if (products.length > 0) {
      const totalStock = products.reduce(
        (sum, p) => sum + (Number(p.stock) || 0),
        0,
      );
      const inventoryValue = products.reduce(
        (sum, p) => sum + (Number(p.price) || 0) * (Number(p.stock) || 0),
        0,
      );
      const totalSold = products.reduce(
        (sum, p) => sum + (Number(p.sold) || 0),
        0,
      );
      return { totalStock, inventoryValue, totalSold };
    } else {
      return { totalStock: 0, inventoryValue: 0, totalSold: 0 };
    }
  }, [products]);

  // Refresh data saat window mendapat focus (kembali dari halaman edit)
  useEffect(() => {
    const handleFocus = () => {
      refreshProducts();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refreshProducts]);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  // FUNGSI HAPUS PRODUK via API
  // Dipanggil dari DataTable saat user klik tombol Hapus
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        await deleteProduct(id);
        refreshProducts(); // Refresh data setelah hapus produk
        alert("Produk berhasil dihapus!");
      }
    } catch (err) {
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
            <p className="text-gray-600 font-medium">Loading...</p>
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
            <h3 className="text-red-800 font-semibold mb-2">
              Terjadi Kesalahan
            </h3>
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
        <AdminHeader
          totalProducts={products.length}
          totalStock={totalStock}
          inventoryValue={inventoryValue}
          totalSold={totalSold}
          onLogout={handleLogout}
        />

        {/* TABEL PRODUK
            Props products = array semua produk untuk ditampilkan
            Props onDelete = fungsi untuk menghapus produk */}
        <DataTable
          products={products}
          onDelete={handleDelete}
          onAddProduct={() => navigate("/admin/add")}
        />
      </div>
    </div>
  );
}
