'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningDependencyService } from '../services/provisioning-dependency.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningDependency } from '@educi/types';

export const useEntProvisioningDependencyList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningDependency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningDependencyService(supabase);
      const data = await service.listProvisioningDependencys(schoolId);
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
