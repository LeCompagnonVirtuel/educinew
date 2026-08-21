'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSTranscriptBlockchainService } from '../services/eduos-transcript-blockchain.service';
import { createClient } from '@/lib/supabase/client';
import type { TranscriptBlockchain } from '@educi/types';

export const useEduOSTranscriptBlockchainList = (schoolId: string) => {
  const [items, setItems] = useState<TranscriptBlockchain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTranscriptBlockchainService(supabase);
      const data = await service.listTranscriptBlockchains(schoolId);
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
