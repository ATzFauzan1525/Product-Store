import { ShoppingCart, Package, Tag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product, onBuy, onAddToCart, viewMode = 'grid', isHighlighted = false }) {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    // Validasi stok
    if (Number(product.stock) <= 0) {
      alert('❌ Stok sedang kosong. Mohon coba lagi nanti.');
      return;
    }

    const message = `Halo, saya ingin memesan/booking ${product.name}`;
    window.open(`https://wa.me/6287783273575?text=${encodeURIComponent(message)}`);
  };

  const handleViewDetails = (product) => {
    navigate(`/detail-produk/${product.id}`);
  };

  return (
    <Card className={`group overflow-hidden hover:shadow-2xl transition-all duration-300 p-0 ${
      viewMode === 'list' ? 'flex' : ''
    } ${isHighlighted ? 'ring-2 ring-blue-400 shadow-blue-200' : ''}`}>
      {/* Image Container with Overlay */}
      <div className={`relative overflow-hidden cursor-pointer bg-white ${
        viewMode === 'list' ? 'w-80 flex-shrink-0' : ''
      }`} onClick={() => handleViewDetails(product)}>
        <img 
          src={product.image} 
          alt={product.name}
          className={`object-cover object-center transition-transform duration-500 group-hover:scale-110 ${
            viewMode === 'grid' ? 'w-full h-96' : 'w-full h-56'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(product);
            }}
            className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-white transition-all transform hover:scale-105"
          >
            <Eye className="w-4 h-4" />
            Lihat Detail
          </button>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm shadow-lg">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-gray-700">{product.category}</span>
          </Badge>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm shadow-lg">
            <Package className={`w-3.5 h-3.5 ${Number(product.stock) <= 0 ? 'text-red-600' : 'text-green-600'}`} />
            <span className={`text-xs font-semibold ${Number(product.stock) <= 0 ? 'text-red-600' : 'text-gray-700'}`}>{Number(product.stock) <= 0 ? 'Stok Kosong' : product.stock}</span>
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className={`${
        viewMode === 'list' ? 'flex-1 p-6' : 'p-6'
      }`}>
        <h3 
          className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer"
          onClick={() => handleViewDetails(product)}
        >
          {product.name}
        </h3>
        
        {/* Price Section */}
        <div className="mb-5">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Harga terbaik untuk Anda</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Add to Cart Button */}
          <Button
            onClick={() => onAddToCart(product)}
            disabled={Number(product.stock) <= 0}
            className="px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-2 group/button"
            title={Number(product.stock) <= 0 ? "Stok sedang kosong" : "Tambah ke keranjang"}
          >
            <ShoppingCart className="w-5 h-5 transition-transform group-hover/button:scale-110" />
            <span>Tambah</span>
          </Button>
          
          {/* Buy Button */}
          <Button
            onClick={handleCheckout}
            disabled={Number(product.stock) <= 0}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3.5 rounded-xl hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 flex items-center justify-center gap-2 group/button"
            title={Number(product.stock) <= 0 ? "Stok sedang kosong" : "Beli via WhatsApp"}
          >
            <ShoppingCart className="w-5 h-5 transition-transform group-hover/button:scale-110" />
            <span>{Number(product.stock) <= 0 ? "Stok Kosong" : "Beli via WA"}</span>
          </Button>
          
          {/* Detail Button */}
          <button
            onClick={() => handleViewDetails(product)}
            className="px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center"
            title="Lihat Detail Produk"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
}