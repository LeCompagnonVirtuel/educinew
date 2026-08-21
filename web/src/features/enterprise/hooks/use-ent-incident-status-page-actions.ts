'use client';

import { useState, useCallback } from 'react';
import { EntIncidentStatusPageService } from '../services/incident-status-page.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentStatusPage, IncidentStatusPageCreate } from '@educi/types';

export const useEntIncidentStatusPageActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentStatusPageCreate): Promise<IncidentStatusPage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentStatusPageService(supabase);
      return await service.createIncidentStatusPage(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentStatusPageCreate>): Promise<IncidentStatusPage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentStatusPageService(supabase);
      return await service.updateIncidentStatusPage(schoolId, id, data);
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
      const service = new EntIncidentStatusPageService(supabase);
      await service.deleteIncidentStatusPage(schoolId, id);
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
