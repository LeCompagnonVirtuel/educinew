'use client';

import { useState, useCallback } from 'react';
import { EduOSDiplomaLedgerService } from '../services/eduos-diploma-ledger.service';
import { createClient } from '@/lib/supabase/client';
import type { DiplomaLedger } from '@educi/types';

export const useEduOSDiplomaLedgerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DiplomaLedger>): Promise<DiplomaLedger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDiplomaLedgerService(supabase);
      return await service.createDiplomaLedger(schoolId, data as DiplomaLedger);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DiplomaLedger>): Promise<DiplomaLedger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDiplomaLedgerService(supabase);
      return await service.updateDiplomaLedger(schoolId, id, data);
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
      const service = new EduOSDiplomaLedgerService(supabase);
      await service.deleteDiplomaLedger(schoolId, id);
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
