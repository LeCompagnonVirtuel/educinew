'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScSensorService } from '../services/sc-sensor.service';
import { createClient } from '@/lib/supabase/client';
import type { Sensor } from '@educi/types';

export const useScSensorList = (schoolId: string) => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSensors = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScSensorService(createClient());
      const data = await service.listSensors(schoolId);
      setSensors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchSensors();
  }, [fetchSensors]);

  return { sensors, loading, error, refresh: fetchSensors };
};
