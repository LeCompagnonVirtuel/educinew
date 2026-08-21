'use client';

import { useState, useCallback } from 'react';
import { EntIncidentAcknowledgmentService } from '../services/incident-acknowledgment.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentAcknowledgment, IncidentAcknowledgmentCreate } from '@educi/types';

export const useEntIncidentAcknowledgmentActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentAcknowledgmentCreate): Promise<IncidentAcknowledgment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentAcknowledgmentService(supabase);
      return await service.createIncidentAcknowledgment(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentAcknowledgmentCreate>): Promise<IncidentAcknowledgment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentAcknowledgmentService(supabase);
      return await service.updateIncidentAcknowledgment(schoolId, id, data);
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
      const service = new EntIncidentAcknowledgmentService(supabase);
      await service.deleteIncidentAcknowledgment(schoolId, id);
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
