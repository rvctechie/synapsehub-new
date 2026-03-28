export interface Agent {
  id: string;
  organization_id: string;
  name: string;
  type: AgentType;
  persona: string | null;
  avatar_url: string | null;
  system_prompt: string;
  greeting: string;
  model: string;
  voice_id: string | null;
  temperature: number;
  max_tokens: number;
  transfer_rules: TransferRule[];
  emergency_protocol: EmergencyProtocol;
  is_active: boolean;
  performance_score: number;
  total_conversations: number;
  created_at: string;
  updated_at: string;
}

export type AgentType = 'chat' | 'voice' | 'both';

export interface TransferRule {
  condition: string;
  transfer_to: string;
  message: string;
}

export interface EmergencyProtocol {
  keywords: string[];
  action: 'transfer_immediately' | 'notify_and_continue' | 'end_conversation';
  transfer_to: string | null;
  message: string;
  notify_team: boolean;
  log_as_critical: boolean;
}
