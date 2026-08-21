'use client';

import { useState, useCallback } from 'react';
import { EntIncidentTimelineService } from '../services/incident-timeline.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentTimeline, IncidentTimelineCreate } from '@educi/types';

export const useEntIncidentTimelineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentTimelineCreate): Promise<IncidentTimeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentTimelineService(supabase);
      return await service.createIncidentTimeline(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentTimelineCreate>): Promise<IncidentTimeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentTimelineService(supabase);
      return await service.updateIncidentTimeline(schoolId, id, data);
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
      const service = new EntIncidentTimelineService(supabase);
      await service.deleteIncidentTimeline(schoolId, id);
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
