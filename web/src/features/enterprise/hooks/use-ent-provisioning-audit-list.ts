'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningAuditService } from '../services/provisioning-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningAudit } from '@educi/types';

export const useEntProvisioningAuditList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningAuditService(supabase);
      const data = await service.listProvisioningAudits(schoolId);
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
