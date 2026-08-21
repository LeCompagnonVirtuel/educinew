'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataBackupService } from '../services/data-backup.service';
import { createClient } from '@/lib/supabase/client';
import type { DataBackup } from '@educi/types';

export const useEntDataBackupList = (schoolId: string) => {
  const [items, setItems] = useState<DataBackup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataBackupService(supabase);
      const data = await service.listDataBackups(schoolId);
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
