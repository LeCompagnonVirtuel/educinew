'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningSecurityService } from '../services/provisioning-security.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningSecurity } from '@educi/types';

export const useEntProvisioningSecurityList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningSecurity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningSecurityService(supabase);
      const data = await service.listProvisioningSecuritys(schoolId);
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
