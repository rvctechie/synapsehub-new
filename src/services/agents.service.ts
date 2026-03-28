import { supabase } from '../lib/supabase';
import type { Agent } from '../types';

export const agentsService = {
  async getAgents(orgId: string) {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('organization_id', orgId)
      .order('created_at');
    if (error) throw error;
    return data as Agent[];
  },

  async getAgent(id: string) {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Agent;
  },

  async createAgent(agent: Partial<Agent>) {
    const { data, error } = await supabase
      .from('agents')
      .insert(agent)
      .select()
      .single();
    if (error) throw error;
    return data as Agent;
  },

  async updateAgent(id: string, updates: Partial<Agent>) {
    const { data, error } = await supabase
      .from('agents')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Agent;
  },

  async deleteAgent(id: string) {
    const { error } = await supabase.from('agents').delete().eq('id', id);
    if (error) throw error;
  },

  async getActiveAgent(orgId: string, type: 'chat' | 'voice' = 'chat') {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('organization_id', orgId)
      .eq('is_active', true)
      .in('type', [type, 'both'])
      .order('performance_score', { ascending: false })
      .limit(1)
      .single();
    if (error) return null;
    return data as Agent;
  },
};
