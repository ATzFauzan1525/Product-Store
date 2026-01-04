// DataTable.jsx
// FILE INI BERTUGAS: Menampilkan tabel daftar semua produk
// User bisa lihat detail produk, edit, dan menghapus produk dari sini

import { Trash2, Package, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

// Props: 
// - products = array berisi semua produk
// - onDelete = fungsi untuk menghapus produk
export default function DataTable({ products, onDelete }) {
  
  // FUNGSI FORMAT HARGA - mengubah angka jadi format Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      {/* CONTAINER TABEL dengan shadow dan border */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* HEADER TABEL - background biru dengan judul */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Daftar Produk</h2>
              <p className="text-sm text-blue-100 mt-1">Total: {products.length} produk</p>
            </div>
          </div>
        </div>
        
        {/* WRAPPER TABLE - bisa scroll horizontal di layar kecil */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-semibold text-blue-600">
                    {product.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {product.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.stock > 50 ? 'bg-green-500' : product.stock > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm text-gray-700 font-medium">
                        {product.stock} unit
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/edit/${product.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Hapus Produk</DialogTitle>
                            <DialogDescription>
                              Apakah Anda yakin ingin menghapus produk "{product.name}"? Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Batal</Button>
                            <Button variant="destructive" onClick={() => onDelete(product.id)}>
                              Hapus
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* TAMPILAN KOSONG */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Belum ada produk</p>
          </div>
        )}
      </div>
    </>
  );
}