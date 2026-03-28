export interface Notification {
  id: string;
  organization_id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  channels: NotificationChannel[];
  priority: NotificationPriority;
  is_read: boolean;
  action_url: string | null;
  metadata: Record<string, any>;
  sent_at: string;
  read_at: string | null;
  created_at: string;
}

export type NotificationType =
  | 'new_lead' | 'booking_created' | 'booking_canceled' | 'missed_call'
  | 'review_received' | 'low_review' | 'transfer_request' | 'system_alert'
  | 'automation_error' | 'daily_summary';

export type NotificationChannel = 'in_app' | 'email' | 'sms' | 'push';
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';
