'use client';

import { useState, useCallback } from 'react';
import { EduOSDataGovernanceService } from '../services/eduos-data-governance.service';
import { createClient } from '@/lib/supabase/client';
import type { DataGovernance } from '@educi/types';

export const useEduOSDataGovernanceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataGovernance): Promise<DataGovernance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataGovernanceService(supabase);
      return await service.createDataGovernance(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataGovernance>): Promise<DataGovernance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataGovernanceService(supabase);
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
      const service = new EduOSDataGovernanceService(supabase);
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