import axiosInstance from '../../../config/axiosInstance';

// Not wired up yet — Warehouse/Location pages currently use local mock state.
export const getWarehouses = async () => {
  const { data } = await axiosInstance.get('/warehouses');
  return data;
};
export const createWarehouse = async (payload) => {
  const { data } = await axiosInstance.post('/warehouses', payload);
  return data;
};
export const updateWarehouse = async (id, payload) => {
  const { data } = await axiosInstance.put(`/warehouses/${id}`, payload);
  return data;
};

export const getLocations = async () => {
  const { data } = await axiosInstance.get('/locations');
  return data;
};
export const createLocation = async (payload) => {
  const { data } = await axiosInstance.post('/locations', payload);
  return data;
};
export const updateLocation = async (id, payload) => {
  const { data } = await axiosInstance.put(`/locations/${id}`, payload);
  return data;
};
