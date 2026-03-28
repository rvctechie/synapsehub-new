import { supabase } from '../lib/supabase';
import type { Lead, LeadFilters } from '../types';

export const leadsService = {
  async getLeads(orgId: string, filters?: LeadFilters, page = 1, pageSize = 25) {
    let query = supabase
      .from('leads')
      .select('*, assigned_user:users!assigned_to(full_name, avatar_url)', { count: 'exact' })
      .eq('organization_id', orgId)
      .order('last_activity_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (filters?.stage?.length) query = query.in('stage', filters.stage);
    if (filters?.temperature?.length) query = query.in('temperature', filters.temperature);
    if (filters?.source?.length) query = query.in('source', filters.source);
    if (filters?.assigned_to) query = query.eq('assigned_to', filters.assigned_to);
    if (filters?.tags?.length) query = query.overlaps('tags', filters.tags);
    if (filters?.search) query = query.ilike('name', `%${filters.search}%`);
    if (filters?.date_from) query = query.gte('created_at', filters.date_from);
    if (filters?.date_to) query = query.lte('created_at', filters.date_to);

    const { data, error, count } = await query;
    if (error) throw error;
    return { leads: data as Lead[], total: count || 0 };
  },

  async getLead(id: string) {
    const { data, error } = await supabase
      .from('leads')
      .select('*, assigned_user:users!assigned_to(full_name, avatar_url)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Lead;
  },

  async createLead(lead: Partial<Lead>) {
    const { data, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single();
    if (error) throw error;
    return data as Lead;
  },

  async updateLead(id: string, updates: Partial<Lead>) {
    const { data, error } = await supabase
      .from('leads')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Lead;
  },

  async deleteLead(id: string) {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
  },

  async getLeadConversations(leadId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*, agent:agents(name, avatar_url)')
      .eq('lead_id', leadId)
      .order('started_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getLeadBookings(leadId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('lead_id', leadId)
      .order('start_time', { ascending: false });
    if (error) throw error;
    return data;
  },

  async bulkUpdateStage(ids: string[], stage: string) {
    const { error } = await supabase
      .from('leads')
      .update({ stage, updated_at: new Date().toISOString() })
      .in('id', ids);
    if (error) throw error;
  },

  async bulkAssign(ids: string[], userId: string) {
    const { error } = await supabase
      .from('leads')
      .update({ assigned_to: userId, updated_at: new Date().toISOString() })
      .in('id', ids);
    if (error) throw error;
  },

  async bulkAddTag(ids: string[], tag: string) {
    // Fetch current tags, append, update
    const { data, error: fetchError } = await supabase
      .from('leads')
      .select('id, tags')
      .in('id', ids);
    if (fetchError) throw fetchError;

    const updates = (data || []).map((lead) => ({
      id: lead.id,
      tags: [...new Set([...(lead.tags || []), tag])],
      updated_at: new Date().toISOString(),
    }));

    for (const update of updates) {
      await supabase.from('leads').update({ tags: update.tags, updated_at: update.updated_at }).eq('id', update.id);
    }
  },
};
