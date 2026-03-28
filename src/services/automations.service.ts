import { supabase } from '../lib/supabase';
import type { Automation, AutomationLog } from '../types';

export const automationsService = {
  async getAutomations(orgId: string) {
    const { data, error } = await supabase
      .from('automations')
      .select('*')
      .eq('organization_id', orgId)
      .order('created_at');
    if (error) throw error;
    return data as Automation[];
  },

  async getAutomation(id: string) {
    const { data, error } = await supabase
      .from('automations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Automation;
  },

  async createAutomation(automation: Partial<Automation>) {
    const { data, error } = await supabase
      .from('automations')
      .insert(automation)
      .select()
      .single();
    if (error) throw error;
    return data as Automation;
  },

  async updateAutomation(id: string, updates: Partial<Automation>) {
    const { data, error } = await supabase
      .from('automations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Automation;
  },

  async toggleAutomation(id: string, isActive: boolean) {
    return this.updateAutomation(id, { is_active: isActive });
  },

  async deleteAutomation(id: string) {
    const { error } = await supabase.from('automations').delete().eq('id', id);
    if (error) throw error;
  },

  async getAutomationLogs(automationId: string, page = 1, pageSize = 25) {
    const { data, error, count } = await supabase
      .from('automation_logs')
      .select('*', { count: 'exact' })
      .eq('automation_id', automationId)
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (error) throw error;
    return { logs: data as AutomationLog[], total: count || 0 };
  },
};
