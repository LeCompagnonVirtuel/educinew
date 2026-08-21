'use client';

import { useState, useCallback } from 'react';
import { EntPlatformDashboardService } from '../services/platform-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformDashboard, PlatformDashboardCreate } from '@educi/types';

export const useEntPlatformDashboardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformDashboardCreate): Promise<PlatformDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformDashboardService(supabase);
      return await service.createPlatformDashboard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformDashboardCreate>): Promise<PlatformDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformDashboardService(supabase);
      return await service.updatePlatformDashboard(schoolId, id, data);
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
      const service = new EntPlatformDashboardService(supabase);
      await service.deletePlatformDashboard(schoolId, id);
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
