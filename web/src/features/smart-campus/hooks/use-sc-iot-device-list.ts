'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScIoTDeviceService } from '../services/sc-iot-device.service';
import { createClient } from '@/lib/supabase/client';
import type { IoTDevice } from '@educi/types';

export const useScIotDeviceList = (schoolId: string) => {
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScIoTDeviceService(createClient());
      const data = await service.listDevices(schoolId);
      setDevices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return { devices, loading, error, refresh: fetchDevices };
};
