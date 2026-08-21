'use client';

import { useState, useCallback } from 'react';
import { EduOSAutomationEdgeService } from '../services/eduos-automation-edge.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationEdge } from '@educi/types';

export const useEduOSAutomationEdgeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutomationEdge): Promise<AutomationEdge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationEdgeService(supabase);
      return await service.createAutomationEdge(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutomationEdge>): Promise<AutomationEdge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationEdgeService(supabase);
      return await service.updateAutomationEdge(schoolId, id, data);
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
      const service = new EduOSAutomationEdgeService(supabase);
      await service.deleteAutomationEdge(schoolId, id);
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