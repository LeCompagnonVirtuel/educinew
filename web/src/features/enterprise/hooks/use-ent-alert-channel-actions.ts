'use client';

import { useState, useCallback } from 'react';
import { EntAlertChannelService } from '../services/alert-channel.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertChannel, AlertChannelCreate } from '@educi/types';

export const useEntAlertChannelActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertChannelCreate): Promise<AlertChannel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertChannelService(supabase);
      return await service.createAlertChannel(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertChannelCreate>): Promise<AlertChannel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertChannelService(supabase);
      return await service.updateAlertChannel(schoolId, id, data);
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
      const service = new EntAlertChannelService(supabase);
      await service.deleteAlertChannel(schoolId, id);
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
