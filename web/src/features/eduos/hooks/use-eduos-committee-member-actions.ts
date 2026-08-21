'use client';

import { useState, useCallback } from 'react';
import { EduOSCommitteeMemberService } from '../services/eduos-committee-member.service';
import { createClient } from '@/lib/supabase/client';
import type { CommitteeMember } from '@educi/types';

export const useEduOSCommitteeMemberActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<CommitteeMember>): Promise<CommitteeMember | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCommitteeMemberService(supabase);
      return await service.createCommitteeMember(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CommitteeMember>): Promise<CommitteeMember | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCommitteeMemberService(supabase);
      return await service.updateCommitteeMember(schoolId, id, data);
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
      const service = new EduOSCommitteeMemberService(supabase);
      await service.deleteCommitteeMember(schoolId, id);
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
