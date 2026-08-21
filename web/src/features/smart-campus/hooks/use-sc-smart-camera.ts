'use client';
import { useState, useCallback } from 'react';
import { ScSmartCameraService } from '../services/sc-smart-camera.service';
import { createClient } from '@/lib/supabase/client';
import type { SmartCamera } from '@educi/types';

export const useScSmartCamera = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFeed = useCallback(async (cameraId: string): Promise<SmartCamera | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScSmartCameraService(createClient());
      return await service.getCamera(schoolId, cameraId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getRecordings = useCallback(async (cameraId: string): Promise<SmartCamera[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScSmartCameraService(createClient());
      return await service.listCameras(schoolId, { cameraId, type: 'recording' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAlerts = useCallback(async (): Promise<SmartCamera[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScSmartCameraService(createClient());
      return await service.listCameras(schoolId, { status: 'alert' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getFeed, getRecordings, getAlerts };
};
