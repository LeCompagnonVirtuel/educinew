'use client';

import { useState, useCallback } from 'react';
import { EntThreatDetectionService } from '../services/threat-detection.service';
import { createClient } from '@/lib/supabase/client';
import type { ThreatDetection, ThreatDetectionCreate } from '@educi/types';

export const useEntThreatDetectionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ThreatDetectionCreate): Promise<ThreatDetection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntThreatDetectionService(supabase);
      return await service.createThreatDetection(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ThreatDetectionCreate>): Promise<ThreatDetection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntThreatDetectionService(supabase);
      return await service.updateThreatDetection(schoolId, id, data);
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
      const service = new EntThreatDetectionService(supabase);
      await service.deleteThreatDetection(schoolId, id);
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
