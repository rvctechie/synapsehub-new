import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { analyticsService } from '../../services';
import { formatNumber, formatPercentage } from '../../lib/utils';
import { SkeletonCard } from '../../components/LoadingSpinner';
import type { DashboardMetrics } from '../../types';

export function DashboardHome() {
  const { user } = useAuthContext();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.organization_id) return;
    analyticsService.getDashboardMetrics(user.organization_id)
      .then(setMetrics)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.organization_id]);

  const cards = metrics ? [
    { label: 'Conversations Today', value: formatNumber(metrics.today.conversations), change: metrics.trends.conversations_change, icon: '💬' },
    { label: 'Leads Captured', value: formatNumber(metrics.today.leads), change: metrics.trends.leads_change, icon: '👥' },
    { label: 'Bookings Made', value: formatNumber(metrics.today.bookings), change: metrics.trends.bookings_change, icon: '📅' },
    { label: 'Conversion Rate', value: formatPercentage(metrics.today.conversion_rate), change: metrics.trends.conversion_change, icon: '📈' },
  ] : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user?.full_name?.split(' ')[0] || 'there'}.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          cards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{card.icon}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  card.change >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {card.change >= 0 ? '+' : ''}{card.change.toFixed(1)}%
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="text-sm text-gray-500 mt-1">{card.label}</div>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-1">Active Conversations</div>
            <div className="text-3xl font-bold text-indigo-600">{metrics.active_conversations}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-1">Pending Bookings</div>
            <div className="text-3xl font-bold text-amber-600">{metrics.pending_bookings}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-1">Unread Notifications</div>
            <div className="text-3xl font-bold text-red-600">{metrics.unread_notifications}</div>
          </div>
        </div>
      )}
    </div>
  );
}
