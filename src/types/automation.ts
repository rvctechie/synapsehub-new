export interface Automation {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  trigger_type: TriggerType;
  trigger_config: Record<string, any>;
  actions: AutomationAction[];
  is_active: boolean;
  is_system: boolean;
  run_count: number;
  last_run_at: string | null;
  created_at: string;
  updated_at: string;
}

export type TriggerType =
  | 'new_lead' | 'lead_stage_change' | 'missed_call' | 'after_hours_message'
  | 'booking_created' | 'booking_reminder' | 'booking_canceled' | 'no_show'
  | 'review_received' | 'low_review' | 'conversation_ended' | 'lead_inactive'
  | 'custom_webhook' | 'scheduled';

export interface AutomationAction {
  id: string;
  type: ActionType;
  config: Record<string, any>;
  order: number;
  parent_id: string | null;
}

export type ActionType =
  | 'send_sms' | 'send_email' | 'create_task' | 'update_lead'
  | 'assign_lead' | 'add_tag' | 'remove_tag' | 'webhook'
  | 'wait' | 'condition' | 'notify_team' | 'create_booking';

export interface AutomationLog {
  id: string;
  automation_id: string;
  organization_id: string;
  trigger_data: Record<string, any>;
  actions_executed: Record<string, any>[];
  status: 'success' | 'partial' | 'failed';
  error_message: string | null;
  duration_ms: number | null;
  created_at: string;
}
