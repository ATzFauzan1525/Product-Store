import { ShoppingCart, Package, Tag } from 'lucide-react';

export default function ProductCard({ product, onBuy }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
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
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
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

        {/* Buy Button */}
        <button
          onClick={() => onBuy(product)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-2 group/button"
        >
          <ShoppingCart className="w-5 h-5 transition-transform group-hover/button:scale-110" />
          <span>Beli Sekarang</span>
        </button>
      </div>
    </div>
  );
}