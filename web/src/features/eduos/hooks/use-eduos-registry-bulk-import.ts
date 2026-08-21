'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSRegistryBulkImportService } from '../services/eduos-registry-bulk-import.service';
import { createClient } from '@/lib/supabase/client';
import type { RegistryBulkImport } from '@educi/types';

export const useEduOSRegistryBulkImportList = (schoolId: string) => {
  const [items, setItems] = useState<RegistryBulkImport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRegistryBulkImportService(supabase);
      const data = await service.listRegistryBulkImports(schoolId);
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
