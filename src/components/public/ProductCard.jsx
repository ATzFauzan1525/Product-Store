import { ShoppingCart, Package, Tag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, onBuy }) {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsAppCheckout = (product) => {
    const formattedPrice = formatPrice(product.price);
    const message = `Halo! Saya tertarik dengan produk:

📱 *${product.name}*
💰 Harga: ${formattedPrice}
📦 Stok: ${product.stock} unit
🏷️ Kategori: ${product.category}

Bisa tolong info lebih lanjut?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6287783273575?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Call onBuy for any additional analytics or logging
    onBuy(product);
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => handleViewDetails(product)}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
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
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-gray-700">{product.category}</span>
          </div>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <Package className="w-3.5 h-3.5 text-green-600" />
            <span className="text-xs font-semibold text-gray-700">{product.stock}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
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
          {/* Buy Button */}
          <button
            onClick={() => handleWhatsAppCheckout(product)}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3.5 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 flex items-center justify-center gap-2 group/button"
          >
            <ShoppingCart className="w-5 h-5 transition-transform group-hover/button:scale-110" />
            <span>Beli via WA</span>
          </button>
          
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
    </div>
  );
}
