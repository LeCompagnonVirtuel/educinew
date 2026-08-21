'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSDKVersionService } from '../services/sdk-version.service';
import { createClient } from '@/lib/supabase/client';
import type { SDKVersion } from '@educi/types';

export const useEntSDKVersionList = (schoolId: string) => {
  const [items, setItems] = useState<SDKVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSDKVersionService(supabase);
      const data = await service.listSDKVersions(schoolId);
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
