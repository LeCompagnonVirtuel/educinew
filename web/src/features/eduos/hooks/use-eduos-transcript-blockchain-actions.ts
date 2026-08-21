'use client';

import { useState, useCallback } from 'react';
import { EduOSTranscriptBlockchainService } from '../services/eduos-transcript-blockchain.service';
import { createClient } from '@/lib/supabase/client';
import type { TranscriptBlockchain } from '@educi/types';

export const useEduOSTranscriptBlockchainActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<TranscriptBlockchain>): Promise<TranscriptBlockchain | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTranscriptBlockchainService(supabase);
      return await service.createTranscriptBlockchain(schoolId, data as TranscriptBlockchain);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TranscriptBlockchain>): Promise<TranscriptBlockchain | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTranscriptBlockchainService(supabase);
      return await service.updateTranscriptBlockchain(schoolId, id, data);
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
      const service = new EduOSTranscriptBlockchainService(supabase);
      await service.deleteTranscriptBlockchain(schoolId, id);
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
