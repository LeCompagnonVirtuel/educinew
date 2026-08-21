'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanFindingService } from '../services/scan-finding.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanFinding } from '@educi/types';

export const useEntScanFindingList = (schoolId: string) => {
  const [items, setItems] = useState<ScanFinding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanFindingService(supabase);
      const data = await service.listScanFindings(schoolId);
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
