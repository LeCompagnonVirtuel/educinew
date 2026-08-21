'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudSecretRotationService } from '../services/global-cloud-secret-rotation.service';
import { createClient } from '@/lib/supabase/client';
import type { SecretRotation } from '@educi/types';

export const useGlobalCloudSecretRotationList = (schoolId: string) => {
  const [items, setItems] = useState<SecretRotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudSecretRotationService(supabase);
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