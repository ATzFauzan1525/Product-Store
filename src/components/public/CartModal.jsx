import { X, Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CartModal({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, selectedItems = [], onToggleSelect, onCheckout, isProcessingCheckout = false }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const selectedCartItems = cart.filter(item => selectedItems.includes(item.id));
  const totalSelectedItems = selectedCartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = selectedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      alert('Pilih produk yang ingin di-checkout terlebih dahulu!');
      return;
    }
    // Cek apakah ada item yang stoknya kosong (0 atau kurang)
    const zeroStockItems = selectedCartItems.filter(item => Number(item.stock) <= 0);

    if (zeroStockItems.length > 0) {
      const names = zeroStockItems.map(i => i.name).join(', ');
      const confirmMsg = `Beberapa produk yang dipilih stoknya kosong: ${names}.\n\nApakah Anda ingin menghapus produk-produk ini dari keranjang sebelum melanjutkan checkout?`;
      if (window.confirm(confirmMsg)) {
        // Hapus item stok 0 dari keranjang
        zeroStockItems.forEach(i => onRemoveItem(i.id));

        // Lanjutkan checkout hanya dengan item yang masih tersisa dan memiliki stok > 0
        const remaining = selectedCartItems.filter(item => Number(item.stock) > 0);
        if (remaining.length === 0) {
          alert('Semua produk yang dipilih stoknya kosong dan telah dihapus dari keranjang.');
          return;
        }
        onCheckout(remaining);
      } else {
        // Batalkan checkout jika user tidak ingin menghapus item stok kosong
        return;
      }
    } else {
      onCheckout(selectedCartItems);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <ShoppingCart className="w-6 h-6" />
            Keranjang Belanja ({totalItems} item{totalItems !== 1 ? 's' : ''})
          </DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Keranjang Kosong</h3>
            <p className="text-gray-500">Tambahkan produk ke keranjang untuk melihatnya di sini</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mt-6 mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cart.length && cart.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allIds = cart.map(item => item.id);
                      onToggleSelect(allIds);
                    } else {
                      onToggleSelect([]);
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Pilih Semua</span>
              </div>
              <span className="text-sm text-gray-600">
                {selectedItems.length} dari {cart.length} produk dipilih
              </span>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => onToggleSelect(item.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-sm font-medium text-blue-600">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="w-8 text-center font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                  disabled={isProcessingCheckout}
                >
                  Lanjut Belanja
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                  disabled={isProcessingCheckout || selectedCartItems.length === 0}
                >
                  {isProcessingCheckout ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Memproses...
                    </div>
                  ) : (
                    'Checkout'
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}