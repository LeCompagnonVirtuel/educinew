'use client';

import { useState, useCallback } from 'react';
import { EduOSCommitteeService } from '../services/eduos-committee.service';
import { createClient } from '@/lib/supabase/client';
import type { Committee } from '@educi/types';

export const useEduOSCommitteeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<Committee>): Promise<Committee | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCommitteeService(supabase);
      return await service.createCommittee(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Committee>): Promise<Committee | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCommitteeService(supabase);
      return await service.updateCommittee(schoolId, id, data);
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
      const service = new EduOSCommitteeService(supabase);
      await service.deleteCommittee(schoolId, id);
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
