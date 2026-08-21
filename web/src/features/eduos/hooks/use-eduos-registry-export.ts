'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSRegistryExportService } from '../services/eduos-registry-export.service';
import { createClient } from '@/lib/supabase/client';
import type { RegistryExport } from '@educi/types';

export const useEduOSRegistryExportList = (schoolId: string) => {
  const [items, setItems] = useState<RegistryExport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRegistryExportService(supabase);
      const data = await service.listRegistryExports(schoolId);
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
