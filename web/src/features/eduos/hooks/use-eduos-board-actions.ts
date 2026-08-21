'use client';

import { useState, useCallback } from 'react';
import { EduOSBoardService } from '../services/eduos-board.service';
import { createClient } from '@/lib/supabase/client';
import type { Board } from '@educi/types';

export const useEduOSBoardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<Board>): Promise<Board | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBoardService(supabase);
      return await service.createBoard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Board>): Promise<Board | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBoardService(supabase);
      return await service.updateBoard(schoolId, id, data);
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
      const service = new EduOSBoardService(supabase);
      await service.deleteBoard(schoolId, id);
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
