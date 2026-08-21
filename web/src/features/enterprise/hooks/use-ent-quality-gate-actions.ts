'use client';

import { useState, useCallback } from 'react';
import { EntQualityGateService } from '../services/quality-gate.service';
import { createClient } from '@/lib/supabase/client';
import type { QualityGate, QualityGateCreate } from '@educi/types';

export const useEntQualityGateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: QualityGateCreate): Promise<QualityGate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityGateService(supabase);
      return await service.createQualityGate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<QualityGateCreate>): Promise<QualityGate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityGateService(supabase);
      return await service.updateQualityGate(schoolId, id, data);
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
      const service = new EntQualityGateService(supabase);
      await service.deleteQualityGate(schoolId, id);
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
