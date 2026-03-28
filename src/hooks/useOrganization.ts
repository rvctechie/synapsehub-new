import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Organization } from '../types';

export function useOrganization(orgId: string | undefined) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) {
      setLoading(false);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', orgId)
        .single();

      if (!error && data) setOrganization(data as Organization);
      setLoading(false);
    };

    fetch();
  }, [orgId]);

  const updateOrganization = async (updates: Partial<Organization>) => {
    if (!orgId) return;
    const { data, error } = await supabase
      .from('organizations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', orgId)
      .select()
      .single();
    if (!error && data) setOrganization(data as Organization);
    return { data, error };
  };

  return { organization, loading, updateOrganization };
}
