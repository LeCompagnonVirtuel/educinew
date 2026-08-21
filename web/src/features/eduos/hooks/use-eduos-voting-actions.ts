'use client';

import { useState, useCallback } from 'react';
import { EduOSVotingService } from '../services/eduos-voting.service';
import { createClient } from '@/lib/supabase/client';
import type { Voting } from '@educi/types';

export const useEduOSVotingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<Voting>): Promise<Voting | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVotingService(supabase);
      return await service.createVoting(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Voting>): Promise<Voting | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVotingService(supabase);
      return await service.updateVoting(schoolId, id, data);
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
      const service = new EduOSVotingService(supabase);
      await service.deleteVoting(schoolId, id);
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
