'use client';

import { useState, useCallback } from 'react';
import { EduOSWalletAnalyticsService } from '../services/eduos-wallet-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { WalletAnalytics } from '@educi/types';

export const useEduOSWalletAnalyticsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WalletAnalytics>): Promise<WalletAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWalletAnalyticsService(supabase);
      return await service.createWalletAnalytics(schoolId, data as WalletAnalytics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WalletAnalytics>): Promise<WalletAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWalletAnalyticsService(supabase);
      return await service.updateWalletAnalytics(schoolId, id, data);
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
      const service = new EduOSWalletAnalyticsService(supabase);
      await service.deleteWalletAnalytics(schoolId, id);
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
