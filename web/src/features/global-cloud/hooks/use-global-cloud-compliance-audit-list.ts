'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudComplianceAuditService } from '../services/global-cloud-compliance-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { ComplianceAudit } from '@educi/types';

export const useGlobalCloudComplianceAuditList = (schoolId: string) => {
  const [items, setItems] = useState<ComplianceAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudComplianceAuditService(supabase);
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