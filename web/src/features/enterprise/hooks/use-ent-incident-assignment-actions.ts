'use client';

import { useState, useCallback } from 'react';
import { EntIncidentAssignmentService } from '../services/incident-assignment.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentAssignment, IncidentAssignmentCreate } from '@educi/types';

export const useEntIncidentAssignmentActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentAssignmentCreate): Promise<IncidentAssignment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentAssignmentService(supabase);
      return await service.createIncidentAssignment(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentAssignmentCreate>): Promise<IncidentAssignment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentAssignmentService(supabase);
      return await service.updateIncidentAssignment(schoolId, id, data);
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
      const service = new EntIncidentAssignmentService(supabase);
      await service.deleteIncidentAssignment(schoolId, id);
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
