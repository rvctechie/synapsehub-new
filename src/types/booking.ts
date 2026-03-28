export interface Booking {
  id: string;
  organization_id: string;
  lead_id: string | null;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  appointment_type: string;
  provider: string | null;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  notes: string | null;
  source: BookingSource;
  reminder_sent: boolean;
  confirmation_sent: boolean;
  external_calendar_event_id: string | null;
  canceled_reason: string | null;
  rescheduled_from: string | null;
  created_at: string;
  updated_at: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'canceled' | 'no_show' | 'rescheduled';
export type BookingSource = 'ai_chat' | 'ai_voice' | 'manual' | 'web_form' | 'import';

export interface AppointmentType {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  buffer_minutes: number;
  price: number | null;
  is_active: boolean;
  color: string;
  max_advance_days: number;
  min_notice_hours: number;
  created_at: string;
  updated_at: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}
