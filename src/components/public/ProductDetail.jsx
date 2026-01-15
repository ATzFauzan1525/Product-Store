import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Tag,
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
} from "lucide-react";
import {
  getProductById,
  formatProductFromApi,
  reduceStockOnCheckout,
  generateOrderId,
} from "../../services/api";
import OrderSuccessModal from "../OrderSuccessModal";
import WhatsAppConfirmationModal from "../WhatsAppConfirmationModal";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [isWhatsAppConfirmOpen, setIsWhatsAppConfirmOpen] = useState(false);
  const [isPendingConfirm, setIsPendingConfirm] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(id);
        const formattedProduct = formatProductFromApi(productData);
        setProduct(formattedProduct);
      } catch {
        setError("Produk tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = async () => {
    // Validasi stok
    if (Number(product.stock) <= 0) {
      alert("❌ Stok sedang kosong. Mohon coba lagi nanti.");
      return;
    }

    if (Number(quantity) > Number(product.stock)) {
      alert(
        `❌ Jumlah pesanan (${quantity}) melebihi stok tersedia (${product.stock}).\n\nMohon periksa kembali.`,
      );
      return;
    }

    const message = `Halo, saya ingin memesan/booking ${product.name}
Jumlah: ${quantity}
Total: ${formatPrice(product.price * quantity)}`;

    // Open WhatsApp
    window.open(
      `https://wa.me/6287783273575?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    // Show confirmation modal
    setIsWhatsAppConfirmOpen(true);
  };

  const handleConfirmWhatsAppOrder = async () => {
    setIsPendingConfirm(true);
    try {
      await reduceStockOnCheckout([
        { id: product.id, quantity: Number(quantity) },
      ]);
      const orderId = generateOrderId();
      setCurrentOrderId(orderId);
      setIsWhatsAppConfirmOpen(false);
      setIsSuccessOpen(true);
    } catch (err) {
      alert(
        "⚠️ Pesanan dikirim ke WhatsApp, tapi ada kesalahan saat mengurangi stok.\n\nError: " +
          (err?.message || err),
      );
      setIsWhatsAppConfirmOpen(false);
    } finally {
      setIsPendingConfirm(false);
    }
  };

  const handleCancelWhatsAppOrder = () => {
    alert("❌ Order dibatalkan.");
    setIsWhatsAppConfirmOpen(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Lihat produk ${product.name} di Product Store`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link produk telah disalin!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Produk tidak ditemukan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "Produk yang Anda cari tidak tersedia"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
          >
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Detail Produk
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-700 shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  {product.name}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 rounded-xl transition-colors ${
                      isWishlisted
                        ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-blue-600" />
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {formatPrice(product.price)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Harga terbaik untuk Anda
              </p>
            </div>

            <div
              className={`bg-white dark:bg-gray-800 p-4 rounded-xl border-2 ${
                Number(product.stock) <= 0
                  ? "border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package
                  className={`w-5 h-5 ${Number(product.stock) <= 0 ? "text-red-600" : "text-green-600"}`}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {Number(product.stock) <= 0
                      ? "Stok Kosong"
                      : "Stok Tersedia"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {Number(product.stock) <= 0
                      ? "Produk ini sedang tidak tersedia"
                      : `${product.stock} unit`}
                  </p>
                </div>
              </div>
            </div>

            {/* Deskripsi Produk */}
            {product.description && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                  Deskripsi Produk
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {Number(product.stock) > 0 && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                <label className="block font-semibold text-gray-900 dark:text-white mb-3">
                  Jumlah
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 dark:border-gray-500 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-6 py-2 font-semibold border-x border-gray-300 dark:border-gray-500">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Maksimal {product.stock} unit
                  </span>
                </div>
              </div>
            )}

            {Number(product.stock) <= 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 p-6 rounded-xl text-center">
                <Package className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">
                  Produk Sedang Tidak Tersedia
                </h3>
                <p className="text-red-600 dark:text-red-400 text-sm">
                  Mohon kembali lagi nanti untuk melihat ketersediaan terbaru
                </p>
              </div>
            )}

            <div
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-green-200 dark:border-green-700"
              style={{
                display: Number(product.stock) > 0 ? "block" : "none",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                disabled={Number(product.stock) <= 0}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 flex items-center justify-center gap-3 transform hover:scale-105"
                title={
                  Number(product.stock) <= 0
                    ? "Stok sedang kosong"
                    : "Beli via WhatsApp"
                }
              >
                <ShoppingCart className="w-6 h-6" />
                {Number(product.stock) <= 0
                  ? "Stok Kosong"
                  : "Beli via WhatsApp"}
              </button>

              <Link
                to="/"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold text-center block"
              >
                Kembali ke Katalog
              </Link>
            </div>

            {/* Order Success Modal */}
            <OrderSuccessModal
              isOpen={isSuccessOpen}
              onClose={() => {
                setIsSuccessOpen(false);
                // Navigate ke halaman utama dan scroll ke produk
                navigate("/?scrollToProducts=true", { replace: true });
              }}
              orderId={currentOrderId}
            />

            {/* WhatsApp Confirmation Modal */}
            <WhatsAppConfirmationModal
              isOpen={isWhatsAppConfirmOpen}
              onConfirm={handleConfirmWhatsAppOrder}
              onCancel={handleCancelWhatsAppOrder}
              isProcessing={isPendingConfirm}
            />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Keunggulan Belanja
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Pengiriman cepat dan aman
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Garansi produk resmi
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Kualitas terjamin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
