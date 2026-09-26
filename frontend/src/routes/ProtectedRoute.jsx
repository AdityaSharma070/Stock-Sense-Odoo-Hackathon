// src/routes/ProtectedRoute.jsx
// Usage in AppRoutes.jsx: <Route element={<ProtectedRoute />}>...your feature routes...</Route>

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
