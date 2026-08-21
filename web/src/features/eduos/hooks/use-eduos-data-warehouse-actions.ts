'use client';

import { useState, useCallback } from 'react';
import { EduOSDataWarehouseService } from '../services/eduos-data-warehouse.service';
import { createClient } from '@/lib/supabase/client';
import type { DataWarehouse } from '@educi/types';

export const useEduOSDataWarehouseActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataWarehouse): Promise<DataWarehouse | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataWarehouseService(supabase);
      return await service.createDataWarehouse(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataWarehouse>): Promise<DataWarehouse | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataWarehouseService(supabase);
      return await service.updateDataWarehouse(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataWarehouseService(supabase);
      await service.deleteDataWarehouse(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};