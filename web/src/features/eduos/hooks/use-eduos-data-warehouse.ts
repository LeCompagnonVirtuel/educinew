'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDataWarehouseService } from '../services/eduos-data-warehouse.service';
import { createClient } from '@/lib/supabase/client';
import type { DataWarehouse } from '@educi/types';

export const useEduOSDataWarehouseList = (schoolId: string) => {
  const [items, setItems] = useState<DataWarehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataWarehouseService(supabase);
      const data = await service.listDataWarehouses(schoolId);
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