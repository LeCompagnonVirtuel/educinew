'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDNSRecordService } from '../services/global-cloud-dns-record.service';
import { createClient } from '@/lib/supabase/client';
import type { DNSRecord } from '@educi/types';

export const useGlobalCloudDNSRecordList = (schoolId: string) => {
  const [items, setItems] = useState<DNSRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDNSRecordService(supabase);
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