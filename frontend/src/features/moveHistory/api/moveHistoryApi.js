import axiosInstance from '../../../config/axiosInstance';

export const getMoveHistory = async (filters = {}) => {
  const { data } = await axiosInstance.get('/move-history', { params: filters });
  return data;
};
