'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScSmartCameraService } from '../services/sc-smart-camera.service';
import { createClient } from '@/lib/supabase/client';
import type { SmartCamera } from '@educi/types';

export const useScSmartCameraList = (schoolId: string) => {
  const [cameras, setCameras] = useState<SmartCamera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCameras = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScSmartCameraService(createClient());
      const data = await service.listCameras(schoolId);
      setCameras(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchCameras();
  }, [fetchCameras]);

  return { cameras, loading, error, refresh: fetchCameras };
};
