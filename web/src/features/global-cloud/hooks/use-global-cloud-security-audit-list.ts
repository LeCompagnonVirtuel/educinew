'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudSecurityAuditService } from '../services/global-cloud-security-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityAudit } from '@educi/types';

export const useGlobalCloudSecurityAuditList = (schoolId: string) => {
  const [items, setItems] = useState<SecurityAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudSecurityAuditService(supabase);
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