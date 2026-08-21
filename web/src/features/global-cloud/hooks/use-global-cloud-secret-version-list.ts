'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudSecretVersionService } from '../services/global-cloud-secret-version.service';
import { createClient } from '@/lib/supabase/client';
import type { SecretVersion } from '@educi/types';

export const useGlobalCloudSecretVersionList = (schoolId: string) => {
  const [items, setItems] = useState<SecretVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudSecretVersionService(supabase);
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