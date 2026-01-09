import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

export default function FilterModal({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  priceRange,
  onApply
}) {
  const [localCategory, setLocalCategory] = useState(selectedCategory);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleApply = () => {
    onApply({
      category: localCategory,
      priceRange: localPriceRange
    });
    onClose();
  };

  const handleReset = () => {
    setLocalCategory('all');
    setLocalPriceRange([0, 50000000]);
    onApply({
      category: 'all',
      priceRange: [0, 50000000]
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white rounded-t-3xl md:rounded-2xl w-full md:w-96 max-h-[90vh] md:max-h-[80vh] overflow-y-auto shadow-2xl animation-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-3xl md:rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Filter Produk</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category Filter */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900"
            >
              <span>Kategori</span>
              {expandedSections.category ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {expandedSections.category && (
              <div className="space-y-3 ml-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={localCategory === category}
                      onChange={(e) => setLocalCategory(e.target.value)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors capitalize">
                      {category === 'all' ? 'Semua Kategori' : category}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900"
            >
              <span>Harga</span>
              {expandedSections.price ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {expandedSections.price && (
              <div className="space-y-4 ml-2">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">
                    Harga Minimum: Rp {localPriceRange[0].toLocaleString('id-ID')}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={localPriceRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      if (newMin <= localPriceRange[1]) {
                        setLocalPriceRange([newMin, localPriceRange[1]]);
                      }
                    }}
                    className="w-full accent-blue-600"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">
                    Harga Maksimum: Rp {localPriceRange[1].toLocaleString('id-ID')}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={localPriceRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      if (newMax >= localPriceRange[0]) {
                        setLocalPriceRange([localPriceRange[0], newMax]);
                      }
                    }}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 space-y-3">
          <button
            onClick={handleApply}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Terapkan Filter
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
}
