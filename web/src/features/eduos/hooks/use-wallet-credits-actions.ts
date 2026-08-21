'use client';

import { useState, useCallback } from 'react';
import { EduOSWalletCreditsService } from '../services/eduos-wallet-credits.service';
import { createClient } from '@/lib/supabase/client';
import type { WalletCredits } from '@educi/types';

export const useEduOSWalletCreditsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WalletCredits>): Promise<WalletCredits | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWalletCreditsService(supabase);
      return await service.createWalletCredits(schoolId, data as WalletCredits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WalletCredits>): Promise<WalletCredits | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWalletCreditsService(supabase);
      return await service.updateWalletCredits(schoolId, id, data);
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
      const service = new EduOSWalletCreditsService(supabase);
      await service.deleteWalletCredits(schoolId, id);
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
