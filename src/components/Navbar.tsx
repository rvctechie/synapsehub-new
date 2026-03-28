import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { ROUTES } from '../lib/constants';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuthContext();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Pricing', href: ROUTES.PRICING },
    { label: 'Demo', href: ROUTES.DEMO },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SynapseHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                to={ROUTES.DASHBOARD}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              {user ? (
                <Link to={ROUTES.DASHBOARD} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg text-center">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to={ROUTES.LOGIN} className="px-4 py-2 text-sm font-medium text-gray-700 text-center">Sign In</Link>
                  <Link to={ROUTES.SIGNUP} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg text-center">Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
