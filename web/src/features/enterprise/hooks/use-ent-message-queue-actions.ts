'use client';

import { useState, useCallback } from 'react';
import { EntMessageQueueService } from '../services/message-queue.service';
import { createClient } from '@/lib/supabase/client';
import type { MessageQueue, MessageQueueCreate } from '@educi/types';

export const useEntMessageQueueActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MessageQueueCreate): Promise<MessageQueue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMessageQueueService(supabase);
      return await service.createMessageQueue(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MessageQueueCreate>): Promise<MessageQueue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMessageQueueService(supabase);
      return await service.updateMessageQueue(schoolId, id, data);
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
      const service = new EntMessageQueueService(supabase);
      await service.deleteMessageQueue(schoolId, id);
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
