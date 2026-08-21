'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export const useGefiWalletDepositActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: WalletDepositCreate): Promise<GefiWalletDeposit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: row, error: err } = await supabase
        .from('gefi_wallet_deposit')
        .insert({ ...data, school_id: schoolId })
        .select()
        .single();
      if (err) throw err;
      return row;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WalletDepositCreate>): Promise<GefiWalletDeposit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: row, error: err } = await supabase
        .from('gefi_wallet_deposit')
        .update(data)
        .eq('id', id)
        .eq('school_id', schoolId)
        .select()
        .single();
      if (err) throw err;
      return row;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { error: err } = await supabase
        .from('gefi_wallet_deposit')
        .delete()
        .eq('id', id)
        .eq('school_id', schoolId);
      if (err) throw err;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};

interface GefiWalletDeposit { id: string; school_id: string; wallet_id: string; amount: number; created_at: string; }
interface WalletDepositCreate { wallet_id: string; amount: number; }
