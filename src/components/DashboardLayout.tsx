import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { ROUTES } from '../lib/constants';
import { getInitials } from '../lib/utils';

const sidebarLinks = [
  { label: 'Overview', href: ROUTES.DASHBOARD, icon: '📊' },
  { label: 'Conversations', href: ROUTES.DASHBOARD_CONVERSATIONS, icon: '💬' },
  { label: 'Leads', href: ROUTES.DASHBOARD_LEADS, icon: '👥' },
  { label: 'Bookings', href: ROUTES.DASHBOARD_BOOKINGS, icon: '📅' },
  { label: 'Automations', href: ROUTES.DASHBOARD_AUTOMATIONS, icon: '⚡' },
  { label: 'Reviews', href: ROUTES.DASHBOARD_REVIEWS, icon: '⭐' },
  { label: 'Analytics', href: ROUTES.DASHBOARD_ANALYTICS, icon: '📈' },
  { label: 'Agents', href: ROUTES.DASHBOARD_AGENTS, icon: '🤖' },
  { label: 'Knowledge Base', href: ROUTES.DASHBOARD_KB, icon: '📚' },
  { label: 'Team', href: ROUTES.DASHBOARD_TEAM, icon: '👤' },
  { label: 'Settings', href: ROUTES.DASHBOARD_SETTINGS, icon: '⚙️' },
  { label: 'Billing', href: ROUTES.DASHBOARD_BILLING, icon: '💳' },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuthContext();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 h-16 px-6 border-b border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-bold text-gray-900">SynapseHub</span>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-semibold">
              {user ? getInitials(user.full_name) : '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={signOut}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 gap-4">
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
