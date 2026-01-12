import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function OrderConfirmationModal({ isOpen, onClose, orderId }) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75"></div>
                <CheckCircle className="w-20 h-20 text-green-600 relative" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Konfirmasi Pesanan
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Apakah Anda ingin melanjutkan ke WhatsApp?
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {orderId && (
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono text-lg font-bold text-gray-900">
                #{orderId}
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 Klik "Lanjut ke WhatsApp" untuk menyelesaikan pesanan Anda.
            </p>
          </div>

          <div className="flex gap-3">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                onClose();
                
              }}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Lanjut ke WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
