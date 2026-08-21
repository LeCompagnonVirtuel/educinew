'use client';

import { useState, useCallback } from 'react';
import { EntIncidentEscalationService } from '../services/incident-escalation.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentEscalation, IncidentEscalationCreate } from '@educi/types';

export const useEntIncidentEscalationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentEscalationCreate): Promise<IncidentEscalation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentEscalationService(supabase);
      return await service.createIncidentEscalation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentEscalationCreate>): Promise<IncidentEscalation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentEscalationService(supabase);
      return await service.updateIncidentEscalation(schoolId, id, data);
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
      const service = new EntIncidentEscalationService(supabase);
      await service.deleteIncidentEscalation(schoolId, id);
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
