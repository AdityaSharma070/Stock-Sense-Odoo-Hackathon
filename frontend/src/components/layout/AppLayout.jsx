// src/components/layout/AppLayout.jsx
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar />
        <main className="p-6 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}