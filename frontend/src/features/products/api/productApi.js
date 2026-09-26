import axiosInstance from '../../../config/axiosInstance';

// Not wired up yet — pages currently use local mock data (see MOCK_PRODUCTS
// in components/ProductTable.jsx). Swap the mock state for these calls once
// the backend is live; the shape pages expect won't change.
export const getProducts = async (filters = {}) => {
  const { data } = await axiosInstance.get('/products', { params: filters });
  return data;
};

export const getProduct = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await axiosInstance.post('/products', payload);
  return data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await axiosInstance.put(`/products/${id}`, payload);
  return data;
};

export const getProductStock = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}/stock`);
  return data;
};
