'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudComplianceReportService } from '../services/global-cloud-compliance-report.service';
import { createClient } from '@/lib/supabase/client';
import type { ComplianceReport } from '@educi/types';

export const useGlobalCloudComplianceReportList = (schoolId: string) => {
  const [items, setItems] = useState<ComplianceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudComplianceReportService(supabase);
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