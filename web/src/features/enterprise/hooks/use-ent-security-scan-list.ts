'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSecurityScanService } from '../services/security-scan.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityScan } from '@educi/types';

export const useEntSecurityScanList = (schoolId: string) => {
  const [items, setItems] = useState<SecurityScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityScanService(supabase);
      const data = await service.listSecurityScans(schoolId);
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
