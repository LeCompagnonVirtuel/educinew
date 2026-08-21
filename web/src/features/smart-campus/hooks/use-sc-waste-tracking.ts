'use client';
import { useState, useCallback } from 'react';
import { ScWasteManagementService } from '../services/sc-waste-management.service';
import { createClient } from '@/lib/supabase/client';
import type { WasteManagement, WasteManagementCreate } from '@educi/types';

export const useScWasteTracking = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logWaste = useCallback(async (data: WasteManagementCreate): Promise<WasteManagement | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWasteManagementService(createClient());
      return await service.createWaste(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getStats = useCallback(async (): Promise<WasteManagement[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWasteManagementService(createClient());
      return await service.listWaste(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getSchedule = useCallback(async (): Promise<WasteManagement[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWasteManagementService(createClient());
      return await service.listWaste(schoolId, { type: 'pickup' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, logWaste, getStats, getSchedule };
};
