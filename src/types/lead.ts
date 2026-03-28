export interface Lead {
  id: string;
  organization_id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  source: LeadSource;
  stage: LeadStage;
  temperature: LeadTemperature;
  score: number;
  assigned_to: string | null;
  tags: string[];
  notes: string | null;
  custom_fields: Record<string, any>;
  first_conversation_id: string | null;
  last_activity_at: string;
  estimated_value: number | null;
  lost_reason: string | null;
  won_at: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadSource = 'chat' | 'voice' | 'sms' | 'web_form' | 'manual' | 'referral' | 'import';
export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type LeadTemperature = 'hot' | 'warm' | 'cold';

export interface LeadFilters {
  stage?: LeadStage[];
  temperature?: LeadTemperature[];
  source?: LeadSource[];
  assigned_to?: string;
  tags?: string[];
  search?: string;
  date_from?: string;
  date_to?: string;
}
