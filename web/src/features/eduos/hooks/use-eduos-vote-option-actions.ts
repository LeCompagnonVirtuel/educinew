'use client';

import { useState, useCallback } from 'react';
import { EduOSVoteOptionService } from '../services/eduos-vote-option.service';
import { createClient } from '@/lib/supabase/client';
import type { VoteOption } from '@educi/types';

export const useEduOSVoteOptionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<VoteOption>): Promise<VoteOption | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVoteOptionService(supabase);
      return await service.createVoteOption(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<VoteOption>): Promise<VoteOption | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVoteOptionService(supabase);
      return await service.updateVoteOption(schoolId, id, data);
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
      const service = new EduOSVoteOptionService(supabase);
      await service.deleteVoteOption(schoolId, id);
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
