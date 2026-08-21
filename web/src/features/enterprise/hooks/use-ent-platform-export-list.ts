'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformExportService } from '../services/platform-export.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformExport } from '@educi/types';

export const useEntPlatformExportList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformExport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformExportService(supabase);
      const data = await service.listPlatformExports(schoolId);
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
