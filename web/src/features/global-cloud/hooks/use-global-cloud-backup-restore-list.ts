'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudBackupRestoreService } from '../services/global-cloud-backup-restore.service';
import { createClient } from '@/lib/supabase/client';
import type { BackupRestore } from '@educi/types';

export const useGlobalCloudBackupRestoreList = (schoolId: string) => {
  const [items, setItems] = useState<BackupRestore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudBackupRestoreService(supabase);
      const data = await service.list(schoolId);
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