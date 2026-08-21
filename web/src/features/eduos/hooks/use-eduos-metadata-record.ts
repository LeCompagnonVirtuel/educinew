'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMetadataRecordService } from '../services/eduos-metadata-record.service';
import { createClient } from '@/lib/supabase/client';
import type { MetadataRecord } from '@educi/types';

export const useEduOSMetadataRecordList = (schoolId: string) => {
  const [items, setItems] = useState<MetadataRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMetadataRecordService(supabase);
      const data = await service.listMetadataRecords(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};