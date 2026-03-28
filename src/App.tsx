import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageLoader } from './components/LoadingSpinner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { ROUTES } from './lib/constants';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/public/HomePage').then(m => ({ default: m.HomePage })));
const PricingPage = lazy(() => import('./pages/public/PricingPage').then(m => ({ default: m.PricingPage })));
const DemoPage = lazy(() => import('./pages/public/DemoPage').then(m => ({ default: m.DemoPage })));
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/auth/SignupPage').then(m => ({ default: m.SignupPage })));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome').then(m => ({ default: m.DashboardHome })));
const ConversationsPage = lazy(() => import('./pages/dashboard/ConversationsPage').then(m => ({ default: m.ConversationsPage })));
const LeadsPage = lazy(() => import('./pages/dashboard/LeadsPage').then(m => ({ default: m.LeadsPage })));
const BookingsPage = lazy(() => import('./pages/dashboard/BookingsPage').then(m => ({ default: m.BookingsPage })));
const AutomationsPage = lazy(() => import('./pages/dashboard/AutomationsPage').then(m => ({ default: m.AutomationsPage })));
const ReviewsPage = lazy(() => import('./pages/dashboard/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const AnalyticsPage = lazy(() => import('./pages/dashboard/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const AgentsPage = lazy(() => import('./pages/dashboard/AgentsPage').then(m => ({ default: m.AgentsPage })));
const KnowledgeBasePage = lazy(() => import('./pages/dashboard/KnowledgeBasePage').then(m => ({ default: m.KnowledgeBasePage })));
const TeamPage = lazy(() => import('./pages/dashboard/TeamPage').then(m => ({ default: m.TeamPage })));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage').then(m => ({ default: m.SettingsPage })));
const BillingPage = lazy(() => import('./pages/dashboard/BillingPage').then(m => ({ default: m.BillingPage })));

// Public layout wrapper
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  // Public routes
  {
    path: ROUTES.HOME,
    element: <PublicLayout><Suspense fallback={<PageLoader />}><HomePage /></Suspense></PublicLayout>,
  },
  {
    path: ROUTES.PRICING,
    element: <PublicLayout><Suspense fallback={<PageLoader />}><PricingPage /></Suspense></PublicLayout>,
  },
  {
    path: ROUTES.DEMO,
    element: <PublicLayout><Suspense fallback={<PageLoader />}><DemoPage /></Suspense></PublicLayout>,
  },

  // Auth routes
  {
    path: ROUTES.LOGIN,
    element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Suspense fallback={<PageLoader />}><SignupPage /></Suspense>,
  },

  // Dashboard routes (protected)
  {
    path: ROUTES.DASHBOARD,
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><DashboardHome /></Suspense> },
      { path: 'conversations', element: <Suspense fallback={<PageLoader />}><ConversationsPage /></Suspense> },
      { path: 'leads', element: <Suspense fallback={<PageLoader />}><LeadsPage /></Suspense> },
      { path: 'bookings', element: <Suspense fallback={<PageLoader />}><BookingsPage /></Suspense> },
      { path: 'automations', element: <Suspense fallback={<PageLoader />}><AutomationsPage /></Suspense> },
      { path: 'reviews', element: <Suspense fallback={<PageLoader />}><ReviewsPage /></Suspense> },
      { path: 'analytics', element: <Suspense fallback={<PageLoader />}><AnalyticsPage /></Suspense> },
      { path: 'agents', element: <Suspense fallback={<PageLoader />}><AgentsPage /></Suspense> },
      { path: 'knowledge-base', element: <Suspense fallback={<PageLoader />}><KnowledgeBasePage /></Suspense> },
      { path: 'team', element: <Suspense fallback={<PageLoader />}><TeamPage /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<PageLoader />}><SettingsPage /></Suspense> },
      { path: 'billing', element: <Suspense fallback={<PageLoader />}><BillingPage /></Suspense> },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <RouterProvider router={router}>
          <AuthProvider>
            {/* App content is rendered through router configuration */}
          </AuthProvider>
        </RouterProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
