import { useState, useEffect, useCallback } from 'react';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  formatProductFromApi,
  formatProductForApi,
  ApiError 
} from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const apiProducts = await getProducts();
      const formattedProducts = apiProducts.map(formatProductFromApi);
      setProducts(formattedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // FUNGSI TAMBAH PRODUK BARU via API
  const addProduct = async (productData) => {
    try {
      setLoading(true);
      setError(null);
      
      const apiProductData = formatProductForApi(productData);
      const newProduct = await createProduct(apiProductData);
      const formattedProduct = formatProductFromApi(newProduct);
      
      // Update local state immediately for better UX
      setProducts(prev => [...prev, formattedProduct]);
      
      return formattedProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.message || 'Failed to add product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // FUNGSI HAPUS PRODUK via API
  const removeProduct = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      await deleteProduct(id);
      
      // Update local state immediately
      setProducts(prev => prev.filter(p => p.id !== id));
      
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.message || 'Failed to delete product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // FUNGSI UPDATE PRODUK via API
  const editProduct = async (updatedProductData) => {
    try {
      setLoading(true);
      setError(null);
      
      const apiProductData = formatProductForApi(updatedProductData);
      const updatedProduct = await updateProduct(updatedProductData.id, apiProductData);
      const formattedProduct = formatProductFromApi(updatedProduct);
      
      // Update local state immediately
      setProducts(prev => 
        prev.map(p => p.id === updatedProductData.id ? formattedProduct : p)
      );
      
      return formattedProduct;
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.message || 'Failed to update product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh products manually
  const refreshProducts = () => {
    fetchProducts();
  };

  return { 
    products, 
    loading,
    error,
    addProduct, 
    deleteProduct: removeProduct,
    updateProduct: editProduct,
    refreshProducts,
    refetch: fetchProducts
  };
}