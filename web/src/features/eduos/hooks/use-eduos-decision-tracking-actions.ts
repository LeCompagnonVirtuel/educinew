'use client';

import { useState, useCallback } from 'react';
import { EduOSDecisionTrackingService } from '../services/eduos-decision-tracking.service';
import { createClient } from '@/lib/supabase/client';
import type { DecisionTracking } from '@educi/types';

export const useEduOSDecisionTrackingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DecisionTracking>): Promise<DecisionTracking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDecisionTrackingService(supabase);
      return await service.createDecisionTracking(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DecisionTracking>): Promise<DecisionTracking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDecisionTrackingService(supabase);
      return await service.updateDecisionTracking(schoolId, id, data);
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
      const service = new EduOSDecisionTrackingService(supabase);
      await service.deleteDecisionTracking(schoolId, id);
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
