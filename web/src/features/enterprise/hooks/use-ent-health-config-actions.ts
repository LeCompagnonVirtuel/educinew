'use client';

import { useState, useCallback } from 'react';
import { EntHealthConfigService } from '../services/health-config.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthConfig, HealthConfigCreate } from '@educi/types';

export const useEntHealthConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: HealthConfigCreate): Promise<HealthConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthConfigService(supabase);
      return await service.createHealthConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthConfigCreate>): Promise<HealthConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthConfigService(supabase);
      return await service.updateHealthConfig(schoolId, id, data);
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
      const service = new EntHealthConfigService(supabase);
      await service.deleteHealthConfig(schoolId, id);
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
