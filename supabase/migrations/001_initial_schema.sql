-- ============================================================
-- SynapseHub Database Schema
-- Supabase (PostgreSQL 15+)
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'manager', 'agent', 'viewer');
CREATE TYPE subscription_tier AS ENUM ('tier_1', 'tier_2', 'tier_3');
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'trialing', 'paused');
CREATE TYPE onboarding_status AS ENUM ('not_started', 'intake', 'kb_building', 'agent_config', 'testing', 'live');
CREATE TYPE lead_source AS ENUM ('chat', 'voice', 'sms', 'web_form', 'manual', 'referral', 'import');
CREATE TYPE lead_stage AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost');
CREATE TYPE lead_temperature AS ENUM ('hot', 'warm', 'cold');
CREATE TYPE channel_type AS ENUM ('chat', 'voice', 'sms', 'email');
CREATE TYPE conversation_status AS ENUM ('active', 'waiting', 'transferred', 'ended');
CREATE TYPE message_role AS ENUM ('user', 'assistant', 'system', 'function');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'canceled', 'no_show', 'rescheduled');
CREATE TYPE booking_source AS ENUM ('ai_chat', 'ai_voice', 'manual', 'web_form', 'import');
CREATE TYPE agent_type AS ENUM ('chat', 'voice', 'both');
CREATE TYPE trigger_type AS ENUM (
  'new_lead', 'lead_stage_change', 'missed_call', 'after_hours_message',
  'booking_created', 'booking_reminder', 'booking_canceled', 'no_show',
  'review_received', 'low_review', 'conversation_ended', 'lead_inactive',
  'custom_webhook', 'scheduled'
);
CREATE TYPE action_type AS ENUM (
  'send_sms', 'send_email', 'create_task', 'update_lead',
  'assign_lead', 'add_tag', 'remove_tag', 'webhook',
  'wait', 'condition', 'notify_team', 'create_booking'
);
CREATE TYPE notification_type AS ENUM (
  'new_lead', 'booking_created', 'booking_canceled', 'missed_call',
  'review_received', 'low_review', 'transfer_request', 'system_alert',
  'automation_error', 'daily_summary'
);
CREATE TYPE notification_channel AS ENUM ('in_app', 'email', 'sms', 'push');
CREATE TYPE notification_priority AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE sentiment_type AS ENUM ('positive', 'neutral', 'negative');
CREATE TYPE review_platform AS ENUM ('google', 'yelp', 'facebook', 'internal', 'other');

-- ============================================================
-- ORGANIZATIONS
-- ============================================================
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  industry TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  logo_url TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address JSONB DEFAULT '{}',
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  business_hours JSONB NOT NULL DEFAULT '{
    "monday": {"open": "09:00", "close": "17:00", "is_closed": false},
    "tuesday": {"open": "09:00", "close": "17:00", "is_closed": false},
    "wednesday": {"open": "09:00", "close": "17:00", "is_closed": false},
    "thursday": {"open": "09:00", "close": "17:00", "is_closed": false},
    "friday": {"open": "09:00", "close": "17:00", "is_closed": false},
    "saturday": {"open": "10:00", "close": "14:00", "is_closed": false},
    "sunday": {"open": "00:00", "close": "00:00", "is_closed": true}
  }',
  tier subscription_tier NOT NULL DEFAULT 'tier_1',
  subscription_status subscription_status NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  onboarding_status onboarding_status NOT NULL DEFAULT 'not_started',
  onboarding_data JSONB,
  settings JSONB NOT NULL DEFAULT '{}',
  monthly_interaction_limit INTEGER NOT NULL DEFAULT 500,
  interactions_used_this_month INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_stripe ON organizations(stripe_customer_id);

-- ============================================================
-- USERS (profiles linked to auth.users)
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'viewer',
  notification_preferences JSONB NOT NULL DEFAULT '{
    "email": true, "sms": true, "in_app": true,
    "quiet_hours_start": null, "quiet_hours_end": null
  }',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_org ON users(organization_id);
CREATE INDEX idx_users_email ON users(email);

-- ============================================================
-- AGENTS
-- ============================================================
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type agent_type NOT NULL DEFAULT 'both',
  persona TEXT,
  avatar_url TEXT,
  system_prompt TEXT NOT NULL,
  greeting TEXT NOT NULL DEFAULT 'Hi! How can I help you today?',
  model TEXT NOT NULL DEFAULT 'gemini-2.0-flash',
  voice_id TEXT,
  temperature NUMERIC(3,2) NOT NULL DEFAULT 0.7,
  max_tokens INTEGER NOT NULL DEFAULT 500,
  transfer_rules JSONB NOT NULL DEFAULT '[]',
  emergency_protocol JSONB NOT NULL DEFAULT '{
    "keywords": ["emergency", "urgent", "911"],
    "action": "transfer_immediately",
    "transfer_to": null,
    "message": "Let me connect you with someone right away.",
    "notify_team": true,
    "log_as_critical": true
  }',
  is_active BOOLEAN NOT NULL DEFAULT true,
  performance_score NUMERIC(5,2) DEFAULT 0,
  total_conversations INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_agents_org ON agents(organization_id);

-- ============================================================
-- KNOWLEDGE BASE
-- ============================================================
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  category TEXT NOT NULL DEFAULT 'general',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  priority INTEGER NOT NULL DEFAULT 5,
  is_active BOOLEAN NOT NULL DEFAULT true,
  source TEXT DEFAULT 'onboarding',
  last_used_at TIMESTAMPTZ,
  use_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_kb_org ON knowledge_base(organization_id);
CREATE INDEX idx_kb_category ON knowledge_base(organization_id, category);
CREATE INDEX idx_kb_agent ON knowledge_base(agent_id);

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  source lead_source NOT NULL DEFAULT 'chat',
  stage lead_stage NOT NULL DEFAULT 'new',
  temperature lead_temperature NOT NULL DEFAULT 'warm',
  score INTEGER NOT NULL DEFAULT 50 CHECK (score >= 0 AND score <= 100),
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT,
  custom_fields JSONB NOT NULL DEFAULT '{}',
  first_conversation_id UUID,
  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  estimated_value NUMERIC(10,2),
  lost_reason TEXT,
  won_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_org ON leads(organization_id);
CREATE INDEX idx_leads_stage ON leads(organization_id, stage);
CREATE INDEX idx_leads_temp ON leads(organization_id, temperature);
CREATE INDEX idx_leads_assigned ON leads(assigned_to);
CREATE INDEX idx_leads_email ON leads(organization_id, email);
CREATE INDEX idx_leads_phone ON leads(organization_id, phone);
CREATE INDEX idx_leads_search ON leads USING gin(name gin_trgm_ops);

-- ============================================================
-- CONVERSATIONS
-- ============================================================
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  channel channel_type NOT NULL,
  status conversation_status NOT NULL DEFAULT 'active',
  visitor_id TEXT,
  caller_phone TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  message_count INTEGER NOT NULL DEFAULT 0,
  sentiment sentiment_type,
  summary TEXT,
  topics TEXT[] NOT NULL DEFAULT '{}',
  lead_captured BOOLEAN NOT NULL DEFAULT false,
  booking_made BOOLEAN NOT NULL DEFAULT false,
  transferred BOOLEAN NOT NULL DEFAULT false,
  transfer_reason TEXT,
  quality_score NUMERIC(5,2),
  recording_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_convos_org ON conversations(organization_id);
CREATE INDEX idx_convos_agent ON conversations(agent_id);
CREATE INDEX idx_convos_lead ON conversations(lead_id);
CREATE INDEX idx_convos_status ON conversations(organization_id, status);
CREATE INDEX idx_convos_started ON conversations(organization_id, started_at DESC);

-- ============================================================
-- MESSAGES
-- ============================================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role message_role NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_convo ON messages(conversation_id, created_at);

-- ============================================================
-- BOOKINGS
-- ============================================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  appointment_type TEXT NOT NULL,
  provider TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  source booking_source NOT NULL DEFAULT 'ai_chat',
  reminder_sent BOOLEAN NOT NULL DEFAULT false,
  confirmation_sent BOOLEAN NOT NULL DEFAULT false,
  external_calendar_event_id TEXT,
  canceled_reason TEXT,
  rescheduled_from UUID REFERENCES bookings(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_org ON bookings(organization_id);
CREATE INDEX idx_bookings_lead ON bookings(lead_id);
CREATE INDEX idx_bookings_time ON bookings(organization_id, start_time);
CREATE INDEX idx_bookings_status ON bookings(organization_id, status);

-- ============================================================
-- APPOINTMENT TYPES
-- ============================================================
CREATE TABLE appointment_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  buffer_minutes INTEGER NOT NULL DEFAULT 15,
  price NUMERIC(10,2),
  is_active BOOLEAN NOT NULL DEFAULT true,
  color TEXT DEFAULT '#6366f1',
  max_advance_days INTEGER NOT NULL DEFAULT 30,
  min_notice_hours INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_appt_types_org ON appointment_types(organization_id);

-- ============================================================
-- AUTOMATIONS
-- ============================================================
CREATE TABLE automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type trigger_type NOT NULL,
  trigger_config JSONB NOT NULL DEFAULT '{}',
  actions JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_system BOOLEAN NOT NULL DEFAULT false,
  run_count INTEGER NOT NULL DEFAULT 0,
  last_run_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_automations_org ON automations(organization_id);
CREATE INDEX idx_automations_trigger ON automations(organization_id, trigger_type);

-- ============================================================
-- AUTOMATION LOGS
-- ============================================================
CREATE TABLE automation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  automation_id UUID NOT NULL REFERENCES automations(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  trigger_data JSONB NOT NULL DEFAULT '{}',
  actions_executed JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'success',
  error_message TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_auto_logs_automation ON automation_logs(automation_id, created_at DESC);
CREATE INDEX idx_auto_logs_org ON automation_logs(organization_id, created_at DESC);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  platform review_platform NOT NULL DEFAULT 'google',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  responded_at TIMESTAMPTZ,
  external_review_id TEXT,
  is_flagged BOOLEAN NOT NULL DEFAULT false,
  sentiment sentiment_type,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_org ON reviews(organization_id);
CREATE INDEX idx_reviews_rating ON reviews(organization_id, rating);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  channels notification_channel[] NOT NULL DEFAULT '{in_app}',
  priority notification_priority NOT NULL DEFAULT 'normal',
  is_read BOOLEAN NOT NULL DEFAULT false,
  action_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_notifications_org ON notifications(organization_id, created_at DESC);

-- ============================================================
-- ANALYTICS (daily aggregates)
-- ============================================================
CREATE TABLE analytics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_conversations INTEGER NOT NULL DEFAULT 0,
  chat_conversations INTEGER NOT NULL DEFAULT 0,
  voice_conversations INTEGER NOT NULL DEFAULT 0,
  sms_conversations INTEGER NOT NULL DEFAULT 0,
  avg_duration_seconds NUMERIC(10,2) DEFAULT 0,
  leads_captured INTEGER NOT NULL DEFAULT 0,
  bookings_made INTEGER NOT NULL DEFAULT 0,
  transfers INTEGER NOT NULL DEFAULT 0,
  missed_calls INTEGER NOT NULL DEFAULT 0,
  avg_sentiment_score NUMERIC(3,2) DEFAULT 0,
  avg_quality_score NUMERIC(5,2) DEFAULT 0,
  top_topics JSONB NOT NULL DEFAULT '[]',
  conversion_rate NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, date)
);

CREATE INDEX idx_analytics_org_date ON analytics_daily(organization_id, date DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;

-- Helper function: get user's org_id
CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS UUID AS $$
  SELECT organization_id FROM users WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- RLS Policies (org-scoped access)
-- Organizations
CREATE POLICY "Users can view own org" ON organizations
  FOR SELECT USING (id = get_user_org_id());
CREATE POLICY "Owners can update own org" ON organizations
  FOR UPDATE USING (id = get_user_org_id() AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('owner', 'admin')
  ));

-- Users
CREATE POLICY "Users can view org members" ON users
  FOR SELECT USING (organization_id = get_user_org_id());
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (id = auth.uid());

-- Agents
CREATE POLICY "Users can view org agents" ON agents
  FOR SELECT USING (organization_id = get_user_org_id());
CREATE POLICY "Admins can manage agents" ON agents
  FOR ALL USING (organization_id = get_user_org_id() AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('owner', 'admin', 'manager')
  ));

-- Knowledge Base
CREATE POLICY "Users can view org KB" ON knowledge_base
  FOR SELECT USING (organization_id = get_user_org_id());
CREATE POLICY "Admins can manage KB" ON knowledge_base
  FOR ALL USING (organization_id = get_user_org_id() AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('owner', 'admin', 'manager')
  ));

-- Leads
CREATE POLICY "Users can view org leads" ON leads
  FOR SELECT USING (organization_id = get_user_org_id());
CREATE POLICY "Users can manage org leads" ON leads
  FOR ALL USING (organization_id = get_user_org_id() AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('owner', 'admin', 'manager', 'agent')
  ));

-- Conversations
CREATE POLICY "Users can view org conversations" ON conversations
  FOR SELECT USING (organization_id = get_user_org_id());

-- Messages
CREATE POLICY "Users can view org messages" ON messages
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM conversations c WHERE c.id = messages.conversation_id AND c.organization_id = get_user_org_id()
  ));

-- Bookings
CREATE POLICY "Users can view org bookings" ON bookings
  FOR SELECT USING (organization_id = get_user_org_id());
CREATE POLICY "Users can manage org bookings" ON bookings
  FOR ALL USING (organization_id = get_user_org_id() AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('owner', 'admin', 'manager', 'agent')
  ));

-- Appointment Types
CREATE POLICY "Users can view org appt types" ON appointment_types
  FOR SELECT USING (organization_id = get_user_org_id());
CREATE POLICY "Admins can manage appt types" ON appointment_types
  FOR ALL USING (organization_id = get_user_org_id() AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('owner', 'admin', 'manager')
  ));

-- Automations
CREATE POLICY "Users can view org automations" ON automations
  FOR SELECT USING (organization_id = get_user_org_id());
CREATE POLICY "Admins can manage automations" ON automations
  FOR ALL USING (organization_id = get_user_org_id() AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('owner', 'admin', 'manager')
  ));

-- Automation Logs
CREATE POLICY "Users can view org auto logs" ON automation_logs
  FOR SELECT USING (organization_id = get_user_org_id());

-- Reviews
CREATE POLICY "Users can view org reviews" ON reviews
  FOR SELECT USING (organization_id = get_user_org_id());
CREATE POLICY "Users can manage org reviews" ON reviews
  FOR ALL USING (organization_id = get_user_org_id() AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('owner', 'admin', 'manager')
  ));

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Analytics
CREATE POLICY "Users can view org analytics" ON analytics_daily
  FOR SELECT USING (organization_id = get_user_org_id());

-- ============================================================
-- TRIGGERS: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_organizations_updated BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_agents_updated BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_knowledge_base_updated BEFORE UPDATE ON knowledge_base FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_leads_updated BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_appointment_types_updated BEFORE UPDATE ON appointment_types FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_automations_updated BEFORE UPDATE ON automations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_reviews_updated BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- FUNCTION: Increment interaction count
-- ============================================================
CREATE OR REPLACE FUNCTION increment_interactions(org_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE organizations
  SET interactions_used_this_month = interactions_used_this_month + 1
  WHERE id = org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- FUNCTION: Reset monthly interactions (call via cron)
-- ============================================================
CREATE OR REPLACE FUNCTION reset_monthly_interactions()
RETURNS VOID AS $$
BEGIN
  UPDATE organizations SET interactions_used_this_month = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- FUNCTION: Auto-create user profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, full_name, organization_id, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(
      (NEW.raw_user_meta_data->>'organization_id')::UUID,
      uuid_generate_v4()
    ),
    COALESCE(
      (NEW.raw_user_meta_data->>'role')::user_role,
      'owner'
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- REALTIME: Enable for key tables
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE leads;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
