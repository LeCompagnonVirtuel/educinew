'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudIdentityAuditService } from '../services/global-cloud-identity-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityAudit } from '@educi/types';

export const useGlobalCloudIdentityAuditList = (schoolId: string) => {
  const [items, setItems] = useState<IdentityAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudIdentityAuditService(supabase);
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