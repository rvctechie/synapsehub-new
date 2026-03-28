export interface AnalyticsDaily {
  id: string;
  organization_id: string;
  date: string;
  total_conversations: number;
  chat_conversations: number;
  voice_conversations: number;
  sms_conversations: number;
  avg_duration_seconds: number;
  leads_captured: number;
  bookings_made: number;
  transfers: number;
  missed_calls: number;
  avg_sentiment_score: number;
  avg_quality_score: number;
  top_topics: TopicCount[];
  conversion_rate: number;
  created_at: string;
}

export interface TopicCount {
  topic: string;
  count: number;
}

export interface DashboardMetrics {
  today: {
    conversations: number;
    leads: number;
    bookings: number;
    conversion_rate: number;
  };
  trends: {
    conversations_change: number;
    leads_change: number;
    bookings_change: number;
    conversion_change: number;
  };
  active_conversations: number;
  pending_bookings: number;
  unread_notifications: number;
}

export interface DateRange {
  from: string;
  to: string;
}
