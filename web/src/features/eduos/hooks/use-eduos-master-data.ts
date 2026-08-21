'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMasterDataService } from '../services/eduos-master-data.service';
import { createClient } from '@/lib/supabase/client';
import type { MasterData } from '@educi/types';

export const useEduOSMasterDataList = (schoolId: string) => {
  const [items, setItems] = useState<MasterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMasterDataService(supabase);
      const data = await service.listMasterData(schoolId);
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