// src/routes/AppRoutes.jsx
// One file, everyone adds their <Route> in their own marked section. Don't create a second router.

import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';

// --- Person 1 ---
import LoginPage from '../features/auth/pages/LoginPage';
import SignupPage from '../features/auth/pages/SignupPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import WarehousePage from '../features/settings/pages/WarehousePage';
import LocationPage from '../features/settings/pages/LocationPage';
import ProfilePage from '../features/profile/pages/ProfilePage';

// --- Person 2 (me) ---
import ProductListPage from '../features/products/pages/ProductListPage';
import ProductCreatePage from '../features/products/pages/ProductCreatePage';
import ProductDetailPage from '../features/products/pages/ProductDetailPage';
import ReceiptListPage from '../features/receipts/pages/ReceiptListPage';
import ReceiptCreatePage from '../features/receipts/pages/ReceiptCreatePage';
import ReceiptDetailPage from '../features/receipts/pages/ReceiptDetailPage';
import MoveHistoryPage from '../features/moveHistory/pages/MoveHistoryPage';

// --- Person 3 — uncomment as pages land ---
// import DeliveryListPage from '../features/deliveries/pages/DeliveryListPage';
// import DeliveryCreatePage from '../features/deliveries/pages/DeliveryCreatePage';
// import DeliveryDetailPage from '../features/deliveries/pages/DeliveryDetailPage';
// import AdjustmentListPage from '../features/adjustments/pages/AdjustmentListPage';
// import AdjustmentCreatePage from '../features/adjustments/pages/AdjustmentCreatePage';
// import AdjustmentDetailPage from '../features/adjustments/pages/AdjustmentDetailPage';
// import AlertsPage from '../features/alerts/pages/AlertsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected — everything below is auth-gated by ProtectedRoute, then rendered inside AppLayout (Sidebar + Topbar) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout title="StockSense" />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductCreatePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />

          <Route path="/receipts" element={<ReceiptListPage />} />
          <Route path="/receipts/new" element={<ReceiptCreatePage />} />
          <Route path="/receipts/:id" element={<ReceiptDetailPage />} />

          <Route path="/move-history" element={<MoveHistoryPage />} />

          <Route path="/settings/warehouses" element={<WarehousePage />} />
          <Route path="/settings/locations" element={<LocationPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Person 3 — add your routes here, same shape as above */}
          {/* <Route path="/deliveries" element={<DeliveryListPage />} /> */}
          {/* <Route path="/deliveries/new" element={<DeliveryCreatePage />} /> */}
          {/* <Route path="/deliveries/:id" element={<DeliveryDetailPage />} /> */}
          {/* <Route path="/adjustments" element={<AdjustmentListPage />} /> */}
          {/* <Route path="/adjustments/new" element={<AdjustmentCreatePage />} /> */}
          {/* <Route path="/adjustments/:id" element={<AdjustmentDetailPage />} /> */}
          {/* <Route path="/alerts" element={<AlertsPage />} /> */}
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}