import { Trash2, Package, Edit } from "lucide-react";
import { Link } from "react-router-dom";
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
  DialogClose, // ✅ TAMBAH
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function DataTable({ products = [], onDelete, onAddProduct }) {
  const formatPrice = (price = 0) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 border-b border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Daftar Produk</h2>
              <p className="text-sm text-blue-100 mt-1">
                Total: {products.length} produk
              </p>
            </div>
          </div>

          <button
            onClick={onAddProduct}
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition"
          >
            + Tambah Produk
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Terjual</TableHead>
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
                    <img
                      src={product.image || "/placeholder.png"} // ✅ fallback
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <span className="font-semibold dark:text-white">{product.name}</span>
                  </div>
                </TableCell>

                <TableCell className="dark:text-white">{product.category}</TableCell>

                <TableCell className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {product.description}
                </TableCell>

                <TableCell className="font-bold dark:text-white">
                  {formatPrice(product.price)}
                </TableCell>

                <TableCell className="dark:text-white">{product.stock} unit</TableCell>

                <TableCell className="dark:text-white">{product.sold || 0} unit</TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Link to={`/admin/edit/${product.id}`}>
                      <Button size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Hapus
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Hapus Produk</DialogTitle>
                          <DialogDescription>
                            Yakin hapus "{product.name}"?
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                          </DialogClose>

                          <Button
                            variant="destructive"
                            onClick={() => onDelete(product.id)}
                          >
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

      {products.length === 0 && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">Data Kosong</div>
      )}
    </div>
  );
}
