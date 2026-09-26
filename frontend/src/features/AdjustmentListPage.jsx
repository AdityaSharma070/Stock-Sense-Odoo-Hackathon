// src/features/adjustments/api/adjustmentApi.js
import axiosInstance from '../../../config/axiosInstance';

export const getAdjustments = async (filters = {}) => {
  const { data } = await axiosInstance.get('/adjustments', { params: filters });
  return data;
};

export const getAdjustmentById = async (id) => {
  const { data } = await axiosInstance.get(`/adjustments/${id}`);
  return data;
};

export const createAdjustment = async (payload) => {
  const { data } = await axiosInstance.post('/adjustments', payload);
  return data;
};
