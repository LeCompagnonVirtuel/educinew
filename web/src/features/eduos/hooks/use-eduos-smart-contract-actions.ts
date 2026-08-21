'use client';

import { useState, useCallback } from 'react';
import { EduOSSmartContractService } from '../services/eduos-smart-contract.service';
import { createClient } from '@/lib/supabase/client';
import type { SmartContract } from '@educi/types';

export const useEduOSSmartContractActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<SmartContract>): Promise<SmartContract | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSmartContractService(supabase);
      return await service.createSmartContract(schoolId, data as SmartContract);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SmartContract>): Promise<SmartContract | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSmartContractService(supabase);
      return await service.updateSmartContract(schoolId, id, data);
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
      const service = new EduOSSmartContractService(supabase);
      await service.deleteSmartContract(schoolId, id);
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
