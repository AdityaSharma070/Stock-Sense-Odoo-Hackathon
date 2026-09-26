import axiosInstance from '../../../config/axiosInstance';

// Not wired up yet — pages use local mock state. Same shape, swap in later.
export const getReceipts = async (filters = {}) => {
  const { data } = await axiosInstance.get('/receipts', { params: filters });
  return data;
};

export const getReceipt = async (id) => {
  const { data } = await axiosInstance.get(`/receipts/${id}`);
  return data;
};

export const createReceipt = async (payload) => {
  const { data } = await axiosInstance.post('/receipts', payload);
  return data;
};

export const validateReceipt = async (id) => {
  const { data } = await axiosInstance.put(`/receipts/${id}/validate`);
  return data;
};
