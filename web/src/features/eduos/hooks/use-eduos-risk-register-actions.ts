'use client';

import { useState, useCallback } from 'react';
import { EduOSRiskRegisterService } from '../services/eduos-risk-register.service';
import { createClient } from '@/lib/supabase/client';
import type { RiskRegister } from '@educi/types';

export const useEduOSRiskRegisterActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<RiskRegister>): Promise<RiskRegister | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRiskRegisterService(supabase);
      return await service.createRiskRegister(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RiskRegister>): Promise<RiskRegister | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRiskRegisterService(supabase);
      return await service.updateRiskRegister(schoolId, id, data);
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
      const service = new EduOSRiskRegisterService(supabase);
      await service.deleteRiskRegister(schoolId, id);
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
