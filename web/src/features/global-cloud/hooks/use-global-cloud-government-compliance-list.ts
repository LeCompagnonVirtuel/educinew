'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudGovernmentComplianceService } from '../services/global-cloud-government-compliance.service';
import { createClient } from '@/lib/supabase/client';
import type { GovernmentCompliance } from '@educi/types';

export const useGlobalCloudGovernmentComplianceList = (schoolId: string) => {
  const [items, setItems] = useState<GovernmentCompliance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudGovernmentComplianceService(supabase);
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