'use client';

import { useState, useCallback } from 'react';
import { EntPlatformRevenueService } from '../services/platform-revenue.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformRevenue, PlatformRevenueCreate } from '@educi/types';

export const useEntPlatformRevenueActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformRevenueCreate): Promise<PlatformRevenue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformRevenueService(supabase);
      return await service.createPlatformRevenue(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformRevenueCreate>): Promise<PlatformRevenue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformRevenueService(supabase);
      return await service.updatePlatformRevenue(schoolId, id, data);
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
      const service = new EntPlatformRevenueService(supabase);
      await service.deletePlatformRevenue(schoolId, id);
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
