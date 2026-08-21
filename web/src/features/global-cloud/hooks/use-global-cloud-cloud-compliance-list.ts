'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudComplianceService } from '../services/global-cloud-cloud-compliance.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudCompliance } from '@educi/types';

export const useGlobalCloudCloudComplianceList = (schoolId: string) => {
  const [items, setItems] = useState<CloudCompliance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudComplianceService(supabase);
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