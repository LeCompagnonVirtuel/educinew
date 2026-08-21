'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningDatabaseService } from '../services/provisioning-database.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningDatabase } from '@educi/types';

export const useEntProvisioningDatabaseList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningDatabase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningDatabaseService(supabase);
      const data = await service.listProvisioningDatabases(schoolId);
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
