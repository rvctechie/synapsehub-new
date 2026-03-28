import { supabase } from '../lib/supabase';
import type { Conversation, Message } from '../types';

export const conversationsService = {
  async getConversations(orgId: string, filters?: { status?: string; channel?: string; agent_id?: string }, page = 1, pageSize = 25) {
    let query = supabase
      .from('conversations')
      .select('*, agent:agents(name, avatar_url), lead:leads(name, email, phone)', { count: 'exact' })
      .eq('organization_id', orgId)
      .order('started_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.channel) query = query.eq('channel', filters.channel);
    if (filters?.agent_id) query = query.eq('agent_id', filters.agent_id);

    const { data, error, count } = await query;
    if (error) throw error;
    return { conversations: data as Conversation[], total: count || 0 };
  },

  async getConversation(id: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*, agent:agents(name, avatar_url, system_prompt), lead:leads(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data as Message[];
  },

  async addMessage(message: Partial<Message>) {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();
    if (error) throw error;

    // Increment message count
    await supabase.rpc('increment_message_count', { convo_id: message.conversation_id });

    return data as Message;
  },

  async endConversation(id: string, summary?: string) {
    const { data, error } = await supabase
      .from('conversations')
      .update({
        status: 'ended',
        ended_at: new Date().toISOString(),
        summary,
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  subscribeToMessages(conversationId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => callback(payload.new as Message)
      )
      .subscribe();
  },

  subscribeToConversations(orgId: string, callback: (conversation: Conversation) => void) {
    return supabase
      .channel(`conversations:${orgId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `organization_id=eq.${orgId}`,
        },
        (payload) => callback(payload.new as Conversation)
      )
      .subscribe();
  },
};
