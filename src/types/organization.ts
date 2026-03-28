export interface Organization {
  id: string;
  name: string;
  slug: string;
  industry: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: Address | null;
  timezone: string;
  business_hours: BusinessHours;
  tier: SubscriptionTier;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  onboarding_status: OnboardingStatus;
  onboarding_data: Record<string, any> | null;
  settings: OrgSettings;
  monthly_interaction_limit: number;
  interactions_used_this_month: number;
  created_at: string;
  updated_at: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface DayHours {
  open: string;
  close: string;
  is_closed: boolean;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export type SubscriptionTier = 'tier_1' | 'tier_2' | 'tier_3';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing' | 'paused';
export type OnboardingStatus = 'not_started' | 'intake' | 'kb_building' | 'agent_config' | 'testing' | 'live';

export interface OrgSettings {
  branding?: {
    primary_color?: string;
    secondary_color?: string;
    font?: string;
  };
  widget?: {
    position?: 'bottom-right' | 'bottom-left';
    theme?: 'light' | 'dark' | 'auto';
    welcome_message?: string;
  };
  notifications?: {
    daily_summary?: boolean;
    real_time_leads?: boolean;
  };
}
