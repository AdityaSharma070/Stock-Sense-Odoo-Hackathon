import axiosInstance from '../../../config/axiosInstance';

// Not wired up yet — pages currently do local mock login. Swap for these once
// the backend is live; the shape pages expect (userData, token) won't change.
export const signup = async (payload) => {
  const { data } = await axiosInstance.post('/auth/signup', payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await axiosInstance.post('/auth/login', payload);
  return data; // expected: { user: {...}, token: '...' }
};

export const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post('/auth/forgot-password', { email });
  return data;
};

export const verifyOtp = async (payload) => {
  const { data } = await axiosInstance.post('/auth/verify-otp', payload);
  return data;
};

export const resetPassword = async (payload) => {
  const { data } = await axiosInstance.post('/auth/reset-password', payload);
  return data;
};
