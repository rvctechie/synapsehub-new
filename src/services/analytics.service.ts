import { supabase } from '../lib/supabase';
import type { AnalyticsDaily, DashboardMetrics, DateRange } from '../types';

export const analyticsService = {
  async getDashboardMetrics(orgId: string): Promise<DashboardMetrics> {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const [todayRes, yesterdayRes, activeRes, pendingRes, unreadRes] = await Promise.all([
      supabase.from('analytics_daily').select('*').eq('organization_id', orgId).eq('date', today).single(),
      supabase.from('analytics_daily').select('*').eq('organization_id', orgId).eq('date', yesterday).single(),
      supabase.from('conversations').select('id', { count: 'exact' }).eq('organization_id', orgId).eq('status', 'active'),
      supabase.from('bookings').select('id', { count: 'exact' }).eq('organization_id', orgId).eq('status', 'pending'),
      supabase.from('notifications').select('id', { count: 'exact' }).eq('organization_id', orgId).eq('is_read', false),
    ]);

    const t = todayRes.data || { total_conversations: 0, leads_captured: 0, bookings_made: 0, conversion_rate: 0 };
    const y = yesterdayRes.data || { total_conversations: 0, leads_captured: 0, bookings_made: 0, conversion_rate: 0 };

    const calcChange = (current: number, previous: number) =>
      previous === 0 ? (current > 0 ? 100 : 0) : ((current - previous) / previous) * 100;

    return {
      today: {
        conversations: t.total_conversations,
        leads: t.leads_captured,
        bookings: t.bookings_made,
        conversion_rate: t.conversion_rate,
      },
      trends: {
        conversations_change: calcChange(t.total_conversations, y.total_conversations),
        leads_change: calcChange(t.leads_captured, y.leads_captured),
        bookings_change: calcChange(t.bookings_made, y.bookings_made),
        conversion_change: calcChange(t.conversion_rate, y.conversion_rate),
      },
      active_conversations: activeRes.count || 0,
      pending_bookings: pendingRes.count || 0,
      unread_notifications: unreadRes.count || 0,
    };
  },

  async getAnalytics(orgId: string, range: DateRange): Promise<AnalyticsDaily[]> {
    const { data, error } = await supabase
      .from('analytics_daily')
      .select('*')
      .eq('organization_id', orgId)
      .gte('date', range.from)
      .lte('date', range.to)
      .order('date');
    if (error) throw error;
    return data as AnalyticsDaily[];
  },
};
