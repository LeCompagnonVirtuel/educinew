'use client';

import { useState, useCallback } from 'react';
import { EduOSBlockchainExplorerService } from '../services/eduos-blockchain-explorer.service';
import { createClient } from '@/lib/supabase/client';
import type { BlockchainExplorer } from '@educi/types';

export const useEduOSBlockchainExplorerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<BlockchainExplorer>): Promise<BlockchainExplorer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainExplorerService(supabase);
      return await service.createBlockchainExplorer(schoolId, data as BlockchainExplorer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BlockchainExplorer>): Promise<BlockchainExplorer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainExplorerService(supabase);
      return await service.updateBlockchainExplorer(schoolId, id, data);
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
      const service = new EduOSBlockchainExplorerService(supabase);
      await service.deleteBlockchainExplorer(schoolId, id);
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
