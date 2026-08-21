'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudComplianceScanService } from '../services/global-cloud-compliance-scan.service';
import { createClient } from '@/lib/supabase/client';
import type { ComplianceScan } from '@educi/types';

export const useGlobalCloudComplianceScanList = (schoolId: string) => {
  const [items, setItems] = useState<ComplianceScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudComplianceScanService(supabase);
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