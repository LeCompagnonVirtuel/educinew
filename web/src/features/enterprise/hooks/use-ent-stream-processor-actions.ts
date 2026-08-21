'use client';

import { useState, useCallback } from 'react';
import { EntStreamProcessorService } from '../services/stream-processor.service';
import { createClient } from '@/lib/supabase/client';
import type { StreamProcessor, StreamProcessorCreate } from '@educi/types';

export const useEntStreamProcessorActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: StreamProcessorCreate): Promise<StreamProcessor | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntStreamProcessorService(supabase);
      return await service.createStreamProcessor(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<StreamProcessorCreate>): Promise<StreamProcessor | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntStreamProcessorService(supabase);
      return await service.updateStreamProcessor(schoolId, id, data);
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
      const service = new EntStreamProcessorService(supabase);
      await service.deleteStreamProcessor(schoolId, id);
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
