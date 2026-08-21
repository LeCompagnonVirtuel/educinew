'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantComplianceService } from '../services/tenant-compliance.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantCompliance } from '@educi/types';

export const useEntTenantComplianceList = (schoolId: string) => {
  const [items, setItems] = useState<TenantCompliance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantComplianceService(supabase);
      const data = await service.listTenantCompliances(schoolId);
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
