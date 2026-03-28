export interface Conversation {
  id: string;
  organization_id: string;
  agent_id: string;
  lead_id: string | null;
  channel: ChannelType;
  status: ConversationStatus;
  visitor_id: string | null;
  caller_phone: string | null;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  message_count: number;
  sentiment: SentimentType | null;
  summary: string | null;
  topics: string[];
  lead_captured: boolean;
  booking_made: boolean;
  transferred: boolean;
  transfer_reason: string | null;
  quality_score: number | null;
  recording_url: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export type ChannelType = 'chat' | 'voice' | 'sms' | 'email';
export type ConversationStatus = 'active' | 'waiting' | 'transferred' | 'ended';
export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  metadata: Record<string, any>;
  created_at: string;
}

export type MessageRole = 'user' | 'assistant' | 'system' | 'function';
