'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLogRotationService } from '../services/log-rotation.service';
import { createClient } from '@/lib/supabase/client';
import type { LogRotation } from '@educi/types';

export const useEntLogRotationList = (schoolId: string) => {
  const [items, setItems] = useState<LogRotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogRotationService(supabase);
      const data = await service.listLogRotations(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
