'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudBackupVaultService } from '../services/global-cloud-backup-vault.service';
import { createClient } from '@/lib/supabase/client';
import type { BackupVault } from '@educi/types';

export const useGlobalCloudBackupVaultList = (schoolId: string) => {
  const [items, setItems] = useState<BackupVault[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudBackupVaultService(supabase);
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