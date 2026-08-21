'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBlockchainEventService } from '../services/eduos-blockchain-event.service';
import { createClient } from '@/lib/supabase/client';
import type { BlockchainEvent } from '@educi/types';

export const useEduOSBlockchainEventList = (schoolId: string) => {
  const [items, setItems] = useState<BlockchainEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainEventService(supabase);
      const data = await service.listBlockchainEvents(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
