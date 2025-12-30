// API Service for MockAPI integration
const BASE_URL = 'https://695249863b3c518fca12168f.mockapi.io/products';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const fetchWithErrorHandling = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(`HTTP error ${response.status}`, response.status);
  }

  return response.json();
};

// =====================
// CRUD OPERATIONS
// =====================

// GET all products
export const getProducts = async () => {
  return fetchWithErrorHandling(BASE_URL);
};

// GET product by ID
export const getProductById = async (id) => {
  return fetchWithErrorHandling(`${BASE_URL}/${id}`);
};

// POST create product
export const createProduct = async (productData) => {
  return fetchWithErrorHandling(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(productData),
  });
};

// PUT update product
export const updateProduct = async (id, productData) => {
  return fetchWithErrorHandling(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
};

// DELETE product
export const deleteProduct = async (id) => {
  return fetchWithErrorHandling(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};

// =====================
// FORMATTERS (OPTIONAL)
// =====================

// From API → UI
export const formatProductFromApi = (product) => ({
  id: product.id,
  name: product.name,
  category: product.category,
  price: Number(product.price),
  description: product.description,
  image: product.image,
  isAvailable: product.isAvailable,
});

// From UI → API
export const formatProductForApi = (product) => ({
  name: product.name,
  category: product.category,
  price: product.price,
  description: product.description,
  image: product.image,
  isAvailable: product.isAvailable,
});

export { ApiError };
