import axiosInstance from '../../../config/axiosInstance';

// Not wired up yet — DashboardPage currently uses local mock data.
export const getDashboardStats = async (filters = {}) => {
  const { data } = await axiosInstance.get('/dashboard/stats', { params: filters });
  return data;
};
