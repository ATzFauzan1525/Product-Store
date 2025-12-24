import { useLocalStorage } from './useLocalStorage';
import { productsData } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useLocalStorage('products', productsData);

  const addProduct = (product) => {
    const maxId = products.length
      ? Math.max(...products.map(p => p.id))
      : 0;

    setProducts([...products, { ...product, id: maxId + 1 }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return { products, addProduct, deleteProduct };
}
