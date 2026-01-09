import { CheckCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

export default function OrderSuccessModal({ isOpen, onClose, orderId }) {
  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert('Order ID disalin ke clipboard!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="text-center space-y-4">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75"></div>
                <CheckCircle className="w-20 h-20 text-green-600 relative" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Pesanan Berhasil! 🎉</h2>
              <p className="text-sm text-gray-600 mt-2">Terima kasih telah berbelanja di Product Store</p>
            </div>
          </div>
        </DialogHeader>

        {/* Order Details */}
        <div className="space-y-6 py-6">
          {/* Message */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-4 rounded-lg text-center space-y-2">
            <p className="text-gray-700 font-medium">
              Halo! Terima kasih telah berbelanja di Product Store 😊
            </p>
            <p className="text-sm text-gray-600">
              Pesanan sedang kami proses. Kami akan menghubungi Anda jika pesanan sudah dikirim.
            </p>
          </div>

          {/* Order ID */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">Order ID</p>
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border border-gray-300">
              <span className="flex-1 font-mono text-lg font-bold text-gray-900">#{orderId}</span>
              <button
                onClick={handleCopyOrderId}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Salin Order ID"
              >
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg space-y-2">
            <p className="text-xs font-semibold text-blue-700">📝 Catatan Penting</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>✓ Pesan Anda sudah diterima</li>
              <li>✓ Kami akan mengirim notifikasi pembaruan</li>
              <li>✓ Simpan Order ID untuk referensi</li>
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            Kembali ke Katalog
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Terima kasih 🙏
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
