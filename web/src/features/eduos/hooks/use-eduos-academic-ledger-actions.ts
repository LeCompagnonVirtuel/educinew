'use client';

import { useState, useCallback } from 'react';
import { EduOSAcademicLedgerService } from '../services/eduos-academic-ledger.service';
import { createClient } from '@/lib/supabase/client';
import type { AcademicLedger } from '@educi/types';

export const useEduOSAcademicLedgerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<AcademicLedger>): Promise<AcademicLedger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAcademicLedgerService(supabase);
      return await service.createAcademicLedger(schoolId, data as AcademicLedger);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AcademicLedger>): Promise<AcademicLedger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAcademicLedgerService(supabase);
      return await service.updateAcademicLedger(schoolId, id, data);
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
      const service = new EduOSAcademicLedgerService(supabase);
      await service.deleteAcademicLedger(schoolId, id);
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
