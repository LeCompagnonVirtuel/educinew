'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScWasteManagementService } from '../services/sc-waste-management.service';
import { createClient } from '@/lib/supabase/client';
import type { WasteManagement } from '@educi/types';

export const useScWasteManagementList = (schoolId: string) => {
  const [wasteRecords, setWasteRecords] = useState<WasteManagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWasteRecords = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScWasteManagementService(createClient());
      const data = await service.listWaste(schoolId);
      setWasteRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchWasteRecords();
  }, [fetchWasteRecords]);

  return { wasteRecords, loading, error, refresh: fetchWasteRecords };
};
