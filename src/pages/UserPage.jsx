import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Star, X } from 'lucide-react';
import Navbar from '../components/public/Navbar';
import ProductCard from '../components/public/ProductCard';
import Footer from '../components/public/Footer';
import FilterBar from '../components/public/FilterBar';
import FilterModal from '../components/public/FilterModal';
import { useProducts } from '../hooks/useProducts';

export default function UserPage() {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Filter products
  const applyFilters = () => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [products, searchQuery, selectedCategory, priceRange]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    // Apply other filters
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  const handleFilterApply = (category, range) => {
    setSelectedCategory(category);
    setPriceRange(range);
    
    let filtered = products;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Apply price range
    filtered = filtered.filter(product =>
      product.price >= range[0] && product.price <= range[1]
    );

    setFilteredProducts(filtered);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 50000000]);
    setFilteredProducts(products);
  };

  const handleBuy = (product) => {
    console.log('Tombol "Beli" diklik untuk produk:', product);
    alert(`Anda membeli ${product.name} seharga ${product.price.toLocaleString('id-ID')}`);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || 
    priceRange[0] !== 0 || priceRange[1] !== 50000000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
      
     {/* Hero Section */}
<div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
  <div className="absolute inset-0 bg-black/10"></div>
  <div className="absolute inset-0">
    <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
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
        Rangkaian produk berkualitas dengan desain modern dan performa yang bisa diandalkan.
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
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-600">Filter aktif:</span>
              
              {searchQuery && (
                <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <span>Pencarian: "{searchQuery}"</span>
                  <button onClick={() => handleSearch('')} className="hover:bg-blue-200 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              {selectedCategory !== 'all' && (
                <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  <span>Kategori: {selectedCategory}</span>
                  <button 
                    onClick={() => handleFilterApply('all', priceRange)} 
                    className="hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              {(priceRange[0] !== 0 || priceRange[1] !== 50000000) && (
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  <span>
                    Harga: {(priceRange[0]/1000000).toFixed(1)}jt - {(priceRange[1]/1000000).toFixed(1)}jt
                  </span>
                  <button 
                    onClick={() => handleFilterApply(selectedCategory, [0, 50000000])} 
                    className="hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              <button 
                onClick={handleClearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
              >
                Hapus semua filter
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Products Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {hasActiveFilters ? 'Hasil Pencarian' : 'Semua Produk'}
              </h2>
              <p className="text-gray-600">
                {hasActiveFilters 
                  ? `Menampilkan ${filteredProducts.length} dari ${products.length} produk`
                  : 'Pilihan terbaik untuk Anda'
                }
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                {filteredProducts.length} produk tersedia
              </span>
            </div>
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Produk tidak ditemukan</h3>
            <p className="text-gray-600 mb-6">
              Coba ubah kata kunci pencarian atau filter Anda
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold"
            >
              Hapus semua filter
            </button>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="transform transition-all duration-300 hover:scale-105"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <ProductCard 
                  product={product} 
                  onBuy={handleBuy}
                />
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

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}