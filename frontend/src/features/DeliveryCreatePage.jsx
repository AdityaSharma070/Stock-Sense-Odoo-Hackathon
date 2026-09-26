// src/features/deliveries/api/deliveryApi.js
// Same pattern as receiptApi.js in Frontend_Structure.md — no axios calls inside components.
import axiosInstance from '../../../config/axiosInstance';

export const getDeliveries = async (filters = {}) => {
  const { data } = await axiosInstance.get('/deliveries', { params: filters });
  return data;
};

export const getDeliveryById = async (id) => {
  const { data } = await axiosInstance.get(`/deliveries/${id}`);
  return data;
};

export const createDelivery = async (payload) => {
  const { data } = await axiosInstance.post('/deliveries', payload);
  return data;
};

export const updateDelivery = async (id, payload) => {
  const { data } = await axiosInstance.put(`/deliveries/${id}`, payload);
  return data;
};

export const validateDelivery = async (id) => {
  const { data } = await axiosInstance.put(`/deliveries/${id}/validate`);
  return data;
};

export const cancelDelivery = async (id) => {
  const { data } = await axiosInstance.put(`/deliveries/${id}/cancel`);
  return data;
};
