'use client';
import { useState, useCallback } from 'react';
import { ScSensorService } from '../services/sc-sensor.service';
import { createClient } from '@/lib/supabase/client';
import type { Sensor } from '@educi/types';

export const useScSensorData = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async (sensorId: string): Promise<Sensor | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScSensorService(createClient());
      return await service.getSensor(schoolId, sensorId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getHistory = useCallback(async (sensorId: string): Promise<Sensor[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScSensorService(createClient());
      return await service.listSensors(schoolId, { sensorId });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAlerts = useCallback(async (): Promise<Sensor[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScSensorService(createClient());
      return await service.listSensors(schoolId, { status: 'alert' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getData, getHistory, getAlerts };
};
