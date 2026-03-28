export interface Review {
  id: string;
  organization_id: string;
  lead_id: string | null;
  platform: ReviewPlatform;
  rating: number;
  content: string | null;
  reviewer_name: string | null;
  reviewer_email: string | null;
  response: string | null;
  responded_at: string | null;
  external_review_id: string | null;
  is_flagged: boolean;
  sentiment: 'positive' | 'neutral' | 'negative' | null;
  created_at: string;
  updated_at: string;
}

export type ReviewPlatform = 'google' | 'yelp' | 'facebook' | 'internal' | 'other';
