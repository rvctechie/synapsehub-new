export interface User {
  id: string;
  organization_id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  notification_preferences: NotificationPreferences;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'owner' | 'admin' | 'manager' | 'agent' | 'viewer';

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  in_app: boolean;
  quiet_hours_start: string | null;
  quiet_hours_end: string | null;
}
