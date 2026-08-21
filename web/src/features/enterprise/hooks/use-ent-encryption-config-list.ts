'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntEncryptionConfigService } from '../services/encryption-config.service';
import { createClient } from '@/lib/supabase/client';
import type { EncryptionConfig } from '@educi/types';

export const useEntEncryptionConfigList = (schoolId: string) => {
  const [items, setItems] = useState<EncryptionConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntEncryptionConfigService(supabase);
      const data = await service.listEncryptionConfigs(schoolId);
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
