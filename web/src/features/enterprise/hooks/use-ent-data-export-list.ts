'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataExportService } from '../services/data-export.service';
import { createClient } from '@/lib/supabase/client';
import type { DataExport } from '@educi/types';

export const useEntDataExportList = (schoolId: string) => {
  const [items, setItems] = useState<DataExport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataExportService(supabase);
      const data = await service.listDataExports(schoolId);
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
