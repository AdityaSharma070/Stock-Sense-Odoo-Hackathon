import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

// Wraps every protected route. Person 1 owns this file — feature pages never
// render their own sidebar/topbar, they just render inside <Outlet />.
export default function AppLayout({ title }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title={title} />
        <main className="p-6 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
