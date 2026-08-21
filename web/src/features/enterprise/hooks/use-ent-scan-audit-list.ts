'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanAuditService } from '../services/scan-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanAudit } from '@educi/types';

export const useEntScanAuditList = (schoolId: string) => {
  const [items, setItems] = useState<ScanAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanAuditService(supabase);
      const data = await service.listScanAudits(schoolId);
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
