'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSToolRegistryEntryService } from '../services/eduos-tool-registry-entry.service';
import { createClient } from '@/lib/supabase/client';
import type { ToolRegistryEntry } from '@educi/types';

export const useEduOSToolRegistryEntryList = (schoolId: string) => {
  const [items, setItems] = useState<ToolRegistryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSToolRegistryEntryService(supabase);
      const data = await service.listToolRegistryEntries(schoolId);
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