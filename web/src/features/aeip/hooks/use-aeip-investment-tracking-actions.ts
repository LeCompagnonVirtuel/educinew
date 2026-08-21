'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FinancialKPI } from '@educi/types';

export function useInvestmentTrackingActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const create = async (tracking: Omit<FinancialKPI, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('aeip_investment_trackings')
        .insert(tracking)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, updates: Partial<FinancialKPI>) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('aeip_investment_trackings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from('aeip_investment_trackings')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading, error };
}
