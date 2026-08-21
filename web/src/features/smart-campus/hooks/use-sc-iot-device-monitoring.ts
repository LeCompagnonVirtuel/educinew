'use client';
import { useState, useCallback } from 'react';
import { ScIoTDeviceService } from '../services/sc-iot-device.service';
import { createClient } from '@/lib/supabase/client';
import type { IoTDevice } from '@educi/types';

export const useScIoTDeviceMonitoring = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStatus = useCallback(async (deviceId: string): Promise<IoTDevice | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScIoTDeviceService(createClient());
      return await service.getDevice(schoolId, deviceId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAlerts = useCallback(async (): Promise<IoTDevice[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScIoTDeviceService(createClient());
      return await service.listDevices(schoolId, { status: 'alert' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const acknowledge = useCallback(async (deviceId: string): Promise<IoTDevice | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScIoTDeviceService(createClient());
      return await service.updateDevice(schoolId, deviceId, { status: 'normal' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getStatus, getAlerts, acknowledge };
};
