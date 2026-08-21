'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntKeyManagementService } from '../services/key-management.service';
import { createClient } from '@/lib/supabase/client';
import type { KeyManagement } from '@educi/types';

export const useEntKeyManagementList = (schoolId: string) => {
  const [items, setItems] = useState<KeyManagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntKeyManagementService(supabase);
      const data = await service.listKeyManagements(schoolId);
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
