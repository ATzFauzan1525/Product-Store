import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function FilterModal({ 
  isOpen, 
  onClose, 
  categories, 
  selectedCategory, 
  priceRange, 
  onApply 
}) {
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  useEffect(() => {
    setTempCategory(selectedCategory);
    setTempPriceRange(priceRange);
  }, [selectedCategory, priceRange, isOpen]);

  const handleApply = () => {
    onApply(tempCategory, tempPriceRange);
  };

  const handleReset = () => {
    setTempCategory('all');
    setTempPriceRange([0, 50000000]);
  };

  const formatPrice = (price) => {
    return `Rp ${(price / 1000000).toFixed(1)} jt`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Filter Produk</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setTempCategory(category)}
                    className={`p-3 rounded-xl border-2 transition-all font-medium text-sm ${
                      tempCategory === category
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize">
                        {category === 'all' ? 'Semua' : category}
                      </span>
                      {tempCategory === category && (
                        <Check className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rentang Harga</h3>
              
              <div className="space-y-4">
                {/* Min Price */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Harga Minimum
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="1000000"
                    value={tempPriceRange[0]}
                    onChange={(e) => setTempPriceRange([parseInt(e.target.value), tempPriceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="mt-2 text-center">
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(tempPriceRange[0])}
                    </span>
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Harga Maksimum
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="1000000"
                    value={tempPriceRange[1]}
                    onChange={(e) => setTempPriceRange([tempPriceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="mt-2 text-center">
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(tempPriceRange[1])}
                    </span>
                  </div>
                </div>

                {/* Price Range Display */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Rentang harga dipilih:</p>
                  <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {formatPrice(tempPriceRange[0])} - {formatPrice(tempPriceRange[1])}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
            >
              Reset Filter
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
        }

        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </>
  );
}