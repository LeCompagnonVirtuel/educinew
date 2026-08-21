'use client';

import { useState, useCallback } from 'react';
import { EntIncidentConfigService } from '../services/incident-config.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentConfig, IncidentConfigCreate } from '@educi/types';

export const useEntIncidentConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentConfigCreate): Promise<IncidentConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentConfigService(supabase);
      return await service.createIncidentConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentConfigCreate>): Promise<IncidentConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentConfigService(supabase);
      return await service.updateIncidentConfig(schoolId, id, data);
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
      const service = new EntIncidentConfigService(supabase);
      await service.deleteIncidentConfig(schoolId, id);
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
