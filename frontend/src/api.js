import axios from 'axios';

// Create an Axios instance with base URL pointing to the Spring Boot backend
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Adjust if your backend runs on a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

export const searchProducts = async (keyword) => {
  const response = await api.get(`/products/search?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};

export const addProduct = async (productData, imageFile) => {
  const formData = new FormData();
  
  // productData is typically a JSON string or Blob in this setup
  formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
  formData.append('imageFile', imageFile);

  const response = await api.post('/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// URL helper for images to use directly in <img src="..." />
export const getProductImageUrl = (productId) => {
  return `http://localhost:8080/api/product/${productId}/image`;
};

export default api;
