import { supabase } from '../lib/supabase';
import type { Booking, AppointmentType, TimeSlot } from '../types';

export const bookingsService = {
  async getBookings(orgId: string, filters?: { status?: string; date_from?: string; date_to?: string }, page = 1, pageSize = 25) {
    let query = supabase
      .from('bookings')
      .select('*, lead:leads(name, email, phone)', { count: 'exact' })
      .eq('organization_id', orgId)
      .order('start_time', { ascending: true })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.date_from) query = query.gte('start_time', filters.date_from);
    if (filters?.date_to) query = query.lte('start_time', filters.date_to);

    const { data, error, count } = await query;
    if (error) throw error;
    return { bookings: data as Booking[], total: count || 0 };
  },

  async createBooking(booking: Partial<Booking>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    if (error) throw error;
    return data as Booking;
  },

  async updateBooking(id: string, updates: Partial<Booking>) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Booking;
  },

  async cancelBooking(id: string, reason: string) {
    return this.updateBooking(id, { status: 'canceled', canceled_reason: reason });
  },

  async getAppointmentTypes(orgId: string) {
    const { data, error } = await supabase
      .from('appointment_types')
      .select('*')
      .eq('organization_id', orgId)
      .eq('is_active', true)
      .order('name');
    if (error) throw error;
    return data as AppointmentType[];
  },

  async createAppointmentType(apptType: Partial<AppointmentType>) {
    const { data, error } = await supabase
      .from('appointment_types')
      .insert(apptType)
      .select()
      .single();
    if (error) throw error;
    return data as AppointmentType;
  },

  async getAvailableSlots(orgId: string, date: string, appointmentTypeId: string): Promise<TimeSlot[]> {
    // Fetch org business hours, existing bookings, and appointment type
    const [orgRes, bookingsRes, typeRes] = await Promise.all([
      supabase.from('organizations').select('business_hours, timezone').eq('id', orgId).single(),
      supabase.from('bookings').select('start_time, end_time').eq('organization_id', orgId)
        .gte('start_time', `${date}T00:00:00`).lte('start_time', `${date}T23:59:59`)
        .in('status', ['pending', 'confirmed']),
      supabase.from('appointment_types').select('duration_minutes, buffer_minutes').eq('id', appointmentTypeId).single(),
    ]);

    if (orgRes.error || typeRes.error) return [];

    const { business_hours, timezone } = orgRes.data;
    const { duration_minutes, buffer_minutes } = typeRes.data;
    const existingBookings = bookingsRes.data || [];

    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long', timeZone: timezone }).toLowerCase();
    const dayHours = business_hours[dayOfWeek];
    if (!dayHours || dayHours.is_closed) return [];

    const slots: TimeSlot[] = [];
    const [openH, openM] = dayHours.open.split(':').map(Number);
    const [closeH, closeM] = dayHours.close.split(':').map(Number);
    const slotDuration = duration_minutes + buffer_minutes;

    let current = new Date(`${date}T${dayHours.open}:00`);
    const end = new Date(`${date}T${dayHours.close}:00`);

    while (current < end) {
      const slotEnd = new Date(current.getTime() + duration_minutes * 60000);
      if (slotEnd > end) break;

      const isBooked = existingBookings.some((b: any) => {
        const bStart = new Date(b.start_time);
        const bEnd = new Date(b.end_time);
        return current < bEnd && slotEnd > bStart;
      });

      slots.push({
        start: current.toISOString(),
        end: slotEnd.toISOString(),
        available: !isBooked,
      });

      current = new Date(current.getTime() + slotDuration * 60000);
    }

    return slots;
  },
};
