'use client';

import { useState, useCallback } from 'react';
import { EntDataGovernanceService } from '../services/data-governance.service';
import { createClient } from '@/lib/supabase/client';
import type { DataGovernance, DataGovernanceCreate } from '@educi/types';

export const useEntDataGovernanceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataGovernanceCreate): Promise<DataGovernance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataGovernanceService(supabase);
      return await service.createDataGovernance(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataGovernanceCreate>): Promise<DataGovernance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataGovernanceService(supabase);
      return await service.updateDataGovernance(schoolId, id, data);
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
      const service = new EntDataGovernanceService(supabase);
      await service.deleteDataGovernance(schoolId, id);
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
