'use client';

import { useState, useCallback } from 'react';
import { EntDeviceTrackingService } from '../services/device-tracking.service';
import { createClient } from '@/lib/supabase/client';
import type { DeviceTracking, DeviceTrackingCreate } from '@educi/types';

export const useEntDeviceTrackingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeviceTrackingCreate): Promise<DeviceTracking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeviceTrackingService(supabase);
      return await service.createDeviceTracking(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeviceTrackingCreate>): Promise<DeviceTracking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeviceTrackingService(supabase);
      return await service.updateDeviceTracking(schoolId, id, data);
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
      const service = new EntDeviceTrackingService(supabase);
      await service.deleteDeviceTracking(schoolId, id);
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
