'use client';

import { useState, useCallback } from 'react';
import { EduOSMasterDataService } from '../services/eduos-master-data.service';
import { createClient } from '@/lib/supabase/client';
import type { MasterData } from '@educi/types';

export const useEduOSMasterDataActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MasterData): Promise<MasterData | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMasterDataService(supabase);
      return await service.createMasterData(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MasterData>): Promise<MasterData | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMasterDataService(supabase);
      return await service.updateMasterData(schoolId, id, data);
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
      const service = new EduOSMasterDataService(supabase);
      await service.deleteMasterData(schoolId, id);
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