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
  console.log('Updating product:', id, productData);
  const result = await fetchWithErrorHandling(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
  console.log('Update result:', result);
  return result;
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
export const formatProductFromApi = (product) => {
  console.log('formatProductFromApi input stock:', product.stock, typeof product.stock);
  const formatted = {
    id: product.id,
    name: product.name,
    category: product.category,
    price: Number(product.price),
    description: product.description,
    image: product.image,
    isAvailable: product.isAvailable,
    // Preserve explicit zero values. Only use default when stock is null/undefined/empty string.
    stock: (product.stock === undefined || product.stock === null || product.stock === '')
      ? 0  // Default to 0 instead of random
      : Number(product.stock),
  };
  console.log('formatProductFromApi output stock:', formatted.stock, typeof formatted.stock);
  return formatted;
};

// From UI → API
export const formatProductForApi = (product) => {
  console.log('formatProductForApi input stock:', product.stock, typeof product.stock);
  const formatted = {
    name: product.name,
    category: product.category,
    price: product.price,
    description: product.description,
    image: product.image,
    isAvailable: product.isAvailable,
    stock: product.stock,
  };
  console.log('formatProductForApi output stock:', formatted.stock, typeof formatted.stock);
  return formatted;
};

// =====================
// AUTHENTICATION
// =====================

// POST login admin
export const loginAdmin = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check credentials
  if (email === 'admin@mail.com' && password === 'supersecret') {
    return {
      success: true,
      token: 'mock-admin-token-12345',
      user: {
        email: 'admin@mail.com',
        role: 'admin'
      }
    };
  } else {
    throw new ApiError('Email atau password salah', 401);
  }
};

export { ApiError };