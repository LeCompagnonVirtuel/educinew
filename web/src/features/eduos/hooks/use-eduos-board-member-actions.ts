'use client';

import { useState, useCallback } from 'react';
import { EduOSBoardMemberService } from '../services/eduos-board-member.service';
import { createClient } from '@/lib/supabase/client';
import type { BoardMember } from '@educi/types';

export const useEduOSBoardMemberActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<BoardMember>): Promise<BoardMember | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBoardMemberService(supabase);
      return await service.createBoardMember(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BoardMember>): Promise<BoardMember | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBoardMemberService(supabase);
      return await service.updateBoardMember(schoolId, id, data);
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
      const service = new EduOSBoardMemberService(supabase);
      await service.deleteBoardMember(schoolId, id);
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
