import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, TrendingUp, Star, X } from "lucide-react";
import Navbar from "../components/public/Navbar";
import ProductCard from "../components/public/ProductCard";
import Footer from "../components/public/Footer";
import FilterBar from "../components/public/FilterBar";
import FilterModal from "../components/public/FilterModal";
import CartModal from "../components/public/CartModal";
import OrderSuccessModal from "../components/OrderSuccessModal";
import WhatsAppConfirmationModal from "../components/WhatsAppConfirmationModal";
import { useProducts } from "../hooks/useProducts";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { reduceStockOnCheckout, generateOrderId } from "../services/api";

export default function UserPage() {
  const { products, loading, error, refreshProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [cart, setCart] = useLocalStorage("cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [isWhatsAppConfirmOpen, setIsWhatsAppConfirmOpen] = useState(false);
  const [isPendingConfirm, setIsPendingConfirm] = useState(false);
  const [pendingCheckoutItems, setPendingCheckoutItems] = useState([]);
  const productRefs = useRef({});
  const [highlightedProduct, setHighlightedProduct] = useState(null);
  const productsSectionRef = useRef(null);

  // Get unique categories
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Scroll to first matching product when search query changes
  useEffect(() => {
    if (searchQuery.trim() && filteredProducts.length > 0) {
      const firstMatchingProduct = filteredProducts[0];
      if (
        firstMatchingProduct &&
        productRefs.current[firstMatchingProduct.id]
      ) {
        setHighlightedProduct(firstMatchingProduct.id);
        productRefs.current[firstMatchingProduct.id].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Remove highlight after 2 seconds
        setTimeout(() => {
          setHighlightedProduct(null);
        }, 2000);
      }
    }
  }, [searchQuery, filteredProducts]);

  // Filter products
  const applyFilters = useCallback(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange]);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle scroll after page load (especially after reload)
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollAfterReload");

    if (products.length > 0 && shouldScroll === "true") {
      // Scroll to products section only after reload from checkout
      const timeoutId = setTimeout(() => {
        const element = document.getElementById("products-section");
        if (element) {
          const top =
            element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
        // Clear the flag after scrolling
        sessionStorage.removeItem("scrollAfterReload");
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    );

    // Apply other filters
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    setFilteredProducts(filtered);
  };

  const handleFilterApply = ({ category, priceRange: range }) => {
    setSelectedCategory(category);
    setPriceRange(range);

    let filtered = products;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply category
    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Apply price range
    filtered = filtered.filter(
      (product) => product.price >= range[0] && product.price <= range[1],
    );

    setFilteredProducts(filtered);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, 50000000]);
    setFilteredProducts(products);
  };

  const handleBuy = (product) => {
    alert(
      `Anda membeli ${product.name} seharga ${product.price.toLocaleString("id-ID")}`,
    );
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} telah ditambahkan ke keranjang!`);
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    setSelectedCartItems((prev) => prev.filter((id) => id !== productId));
  };

  const toggleCartSelect = (itemIds) => {
    if (Array.isArray(itemIds)) {
      setSelectedCartItems(itemIds);
    } else {
      setSelectedCartItems((prev) =>
        prev.includes(itemIds)
          ? prev.filter((id) => id !== itemIds)
          : [...prev, itemIds],
      );
    }
  };

  const handleCheckout = async (selectedItems) => {
    if (selectedItems.length === 0) {
      alert("Pilih produk yang ingin di-checkout terlebih dahulu!");
      return;
    }

    // Update cart items dengan stok terbaru dari products
    const updatedSelectedItems = selectedItems.map((item) => {
      const latestProduct = products.find((p) => p.id === item.id);
      return {
        ...item,
        stock: latestProduct?.stock || item.stock,
      };
    });

    // Cegah checkout jika ada item stok kosong atau quantity melebihi stok
    const zeroStock = updatedSelectedItems.some(
      (item) => Number(item.stock) <= 0,
    );
    if (zeroStock) {
      alert(
        "Ada produk yang stoknya kosong. Hapus atau perbarui stok sebelum checkout.",
      );
      return;
    }

    const overQty = updatedSelectedItems.some(
      (item) => Number(item.quantity) > Number(item.stock),
    );
    if (overQty) {
      const overItems = updatedSelectedItems.filter(
        (item) => Number(item.quantity) > Number(item.stock),
      );
      const details = overItems
        .map(
          (item) =>
            `${item.name} (pesan: ${item.quantity}, stok: ${item.stock})`,
        )
        .join(", ");
      alert(`Jumlah pesanan melebihi stok tersedia:\n${details}`);
      return;
    }

    setIsProcessingCheckout(true);

    try {
      const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(price);
      };

      const totalPrice = updatedSelectedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      // Format pesan WhatsApp
      let message = `Halo, saya ingin memesan/booking produk berikut:\n\n`;

      updatedSelectedItems.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   - Harga: ${formatPrice(item.price)}\n`;
        message += `   - Jumlah: ${item.quantity}\n`;
        message += `   - Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
      });

      message += `Total Pembayaran: ${formatPrice(totalPrice)}\n\n`;
      message += `Mohon konfirmasi ketersediaan stok dan informasi pembayaran. Terima kasih!`;

      // Open WhatsApp
      const whatsappUrl = `https://wa.me/6287783273575?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      // Store checkout items and show confirmation modal
      const checkoutData = updatedSelectedItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));
      setPendingCheckoutItems(checkoutData);
      setIsWhatsAppConfirmOpen(true);
      setIsProcessingCheckout(false);
    } catch (error) {
      alert(
        "❌ Terjadi kesalahan saat memproses checkout. Silakan coba lagi.\n\nError: " +
          error.message,
      );
      setIsProcessingCheckout(false);
    }
  };

  const handleConfirmWhatsAppOrder = async () => {
    setIsPendingConfirm(true);
    try {
      await reduceStockOnCheckout(pendingCheckoutItems);

      // Remove checked out items from cart
      const checkedOutIds = pendingCheckoutItems.map((i) => i.id);
      setCart((prevCart) =>
        prevCart.filter((item) => !checkedOutIds.includes(item.id)),
      );
      setSelectedCartItems((prev) =>
        prev.filter((id) => !checkedOutIds.includes(id)),
      );

      // Refresh products data
      try {
        await refreshProducts();
      } catch {
        // Silent fail - reload will fix data
      }

      // Show confirmation
      const orderId = generateOrderId();
      setCurrentOrderId(orderId);
      setIsWhatsAppConfirmOpen(false);
      setIsSuccessOpen(true);
      setIsCartOpen(false);

      // Do not auto-reload: let user dismiss success notification manually
    } catch (stockError) {
      await refreshProducts();
      alert(
        "⚠️ Pesanan dikirim ke WhatsApp, tapi ada kesalahan saat mengurangi stok.\n\nError: " +
          (stockError?.message || stockError),
      );
      setIsWhatsAppConfirmOpen(false);
    } finally {
      setIsPendingConfirm(false);
      setPendingCheckoutItems([]);
    }
  };

  const handleCancelWhatsAppOrder = () => {
    alert("❌ Order dibatalkan.");
    setIsWhatsAppConfirmOpen(false);
    setPendingCheckoutItems([]);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 50000000;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
        <div className="flex items-center justify-center min-h-[60vh]">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md mx-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Terjadi Kesalahan
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar
        searchQuery={searchQuery}
        onSearch={handleSearch}
        cart={cart}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 dark:bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 dark:bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 border border-white/30">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Koleksi Pilihan Terbaik ✨
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Katalog Produk
              <span className="block text-blue-100 mt-2">
                Untuk Gaya dan Kebutuhan Kamu
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Rangkaian produk berkualitas dengan desain modern dan performa
              yang bisa diandalkan.
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-lg">
                    Desain Relevan
                  </div>
                  <div className="text-blue-100 text-sm">
                    Selalu mengikuti tren
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-lg">
                    Kualitas Terjaga
                  </div>
                  <div className="text-blue-100 text-sm">
                    Dipilih dengan standar terbaik
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        onFilterClick={() => setIsFilterOpen(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Filter aktif:
              </span>

              {searchQuery && (
                <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                  <span>Pencarian: "{searchQuery}"</span>
                  <button
                    onClick={() => handleSearch("")}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedCategory !== "all" && (
                <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                  <span>Kategori: {selectedCategory}</span>
                  <button
                    onClick={() => handleFilterApply({ category: "all", priceRange: priceRange })}
                    className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {(priceRange[0] !== 0 || priceRange[1] !== 50000000) && (
                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                  <span>
                    Harga: {(priceRange[0] / 1000000).toFixed(1)}jt -{" "}
                    {(priceRange[1] / 1000000).toFixed(1)}jt
                  </span>
                  <button
                    onClick={() =>
                      handleFilterApply({ category: selectedCategory, priceRange: [0, 50000000] })
                    }
                    className="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <button
                onClick={handleClearFilters}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium ml-2"
              >
                Hapus semua filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div
        id="products-section"
        ref={productsSectionRef}
        className="container mx-auto px-4 py-12 md:py-16"
      >
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {hasActiveFilters ? "Hasil Pencarian" : "Semua Produk"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {hasActiveFilters
                  ? `Menampilkan ${filteredProducts.length} dari ${products.length} produk`
                  : "Pilihan terbaik untuk Anda"}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-5 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {filteredProducts.length} produk tersedia
              </span>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Data Kosong</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Belum ada produk untuk ditampilkan.</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all font-semibold"
            >
              Hapus semua filter
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Produk tidak ditemukan
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Coba ubah kata kunci pencarian atau filter Anda</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all font-semibold"
            >
              Hapus semua filter
            </button>
          </div>
        ) : (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "gap-4 grid-cols-1"
            }`}
          >
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => (productRefs.current[product.id] = el)}
                className={`transform transition-all duration-300 hover:scale-105 ${
                  highlightedProduct === product.id
                    ? "ring-4 ring-blue-500 ring-opacity-50 scale-105"
                    : ""
                }`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <ProductCard
                  product={product}
                  onBuy={handleBuy}
                  onAddToCart={addToCart}
                  viewMode={viewMode}
                  isHighlighted={highlightedProduct === product.id}
                />
              </div>
            ))}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "gap-4 grid-cols-1"
            }`}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                  <div className="h-56 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
                    <div className="flex gap-3">
                      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex-1"></div>
                      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        priceRange={priceRange}
        onApply={handleFilterApply}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        selectedItems={selectedCartItems}
        onToggleSelect={toggleCartSelect}
        onCheckout={handleCheckout}
        isProcessingCheckout={isProcessingCheckout}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal isOpen={isSuccessOpen} orderId={currentOrderId} />

      {/* WhatsApp Confirmation Modal */}
      <WhatsAppConfirmationModal
        isOpen={isWhatsAppConfirmOpen}
        onConfirm={handleConfirmWhatsAppOrder}
        onCancel={handleCancelWhatsAppOrder}
        isProcessing={isPendingConfirm}
      />

      <Footer />
    </div>
  );
}
