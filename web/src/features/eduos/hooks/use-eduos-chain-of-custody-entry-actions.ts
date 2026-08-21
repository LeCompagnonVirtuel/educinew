'use client';

import { useState, useCallback } from 'react';
import { EduOSChainOfCustodyEntryService } from '../services/eduos-chain-of-custody-entry.service';
import { createClient } from '@/lib/supabase/client';
import type { ChainOfCustodyEntry } from '@educi/types';

export const useEduOSChainOfCustodyEntryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ChainOfCustodyEntry>): Promise<ChainOfCustodyEntry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSChainOfCustodyEntryService(supabase);
      return await service.createChainOfCustodyEntry(schoolId, data as ChainOfCustodyEntry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ChainOfCustodyEntry>): Promise<ChainOfCustodyEntry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSChainOfCustodyEntryService(supabase);
      return await service.updateChainOfCustodyEntry(schoolId, id, data);
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
      const service = new EduOSChainOfCustodyEntryService(supabase);
      await service.deleteChainOfCustodyEntry(schoolId, id);
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
