import { supabase } from '../lib/supabase';
import type { Review } from '../types';

export const reviewsService = {
  async getReviews(orgId: string, filters?: { platform?: string; rating_min?: number; is_flagged?: boolean }, page = 1, pageSize = 25) {
    let query = supabase
      .from('reviews')
      .select('*, lead:leads(name)', { count: 'exact' })
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (filters?.platform) query = query.eq('platform', filters.platform);
    if (filters?.rating_min) query = query.gte('rating', filters.rating_min);
    if (filters?.is_flagged !== undefined) query = query.eq('is_flagged', filters.is_flagged);

    const { data, error, count } = await query;
    if (error) throw error;
    return { reviews: data as Review[], total: count || 0 };
  },

  async respondToReview(id: string, response: string) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ response, responded_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Review;
  },

  async flagReview(id: string, flagged: boolean) {
    const { error } = await supabase
      .from('reviews')
      .update({ is_flagged: flagged, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  },

  async getReviewStats(orgId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating, platform')
      .eq('organization_id', orgId);
    if (error) throw error;

    const total = data.length;
    const avgRating = total > 0 ? data.reduce((sum, r) => sum + r.rating, 0) / total : 0;
    const distribution = [1, 2, 3, 4, 5].map((star) => ({
      star,
      count: data.filter((r) => r.rating === star).length,
    }));
    const byPlatform = data.reduce((acc, r) => {
      acc[r.platform] = (acc[r.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, avgRating, distribution, byPlatform };
  },
};
