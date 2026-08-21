'use client';

import { useState, useCallback } from 'react';
import { EduOSBlockchainEventService } from '../services/eduos-blockchain-event.service';
import { createClient } from '@/lib/supabase/client';
import type { BlockchainEvent } from '@educi/types';

export const useEduOSBlockchainEventActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<BlockchainEvent>): Promise<BlockchainEvent | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainEventService(supabase);
      return await service.createBlockchainEvent(schoolId, data as BlockchainEvent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BlockchainEvent>): Promise<BlockchainEvent | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainEventService(supabase);
      return await service.updateBlockchainEvent(schoolId, id, data);
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
      const service = new EduOSBlockchainEventService(supabase);
      await service.deleteBlockchainEvent(schoolId, id);
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
