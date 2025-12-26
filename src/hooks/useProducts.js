import { useLocalStorage } from './useLocalStorage';
import { productsData } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useLocalStorage('products', productsData);

  // FUNGSI TAMBAH PRODUK BARU
  const addProduct = (product) => {
    const maxId = products.length
      ? Math.max(...products.map(p => p.id))
      : 0;

    setProducts([...products, { ...product, id: maxId + 1 }]);
  };

  // FUNGSI HAPUS PRODUK
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // ✨ FUNGSI UPDATE PRODUK (BARU)
  // Menerima produk yang sudah diupdate
  // Mencari produk dengan ID yang sama dan replace dengan data baru
  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  return { 
    products, 
    addProduct, 
    deleteProduct,
    updateProduct  // ← JANGAN LUPA RETURN updateProduct
  };
}