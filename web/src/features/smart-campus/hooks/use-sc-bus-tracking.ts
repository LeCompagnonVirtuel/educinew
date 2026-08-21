'use client';
import { useState, useCallback } from 'react';
import { ScGPSTrackingService } from '../services/sc-gps-tracking.service';
import { createClient } from '@/lib/supabase/client';
import type { GPSTracking, GPSLocation } from '@educi/types';

export const useScBusTracking = (schoolId: string) => {
  const [location, setLocation] = useState<GPSTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const track = useCallback(async (busId: string) => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScGPSTrackingService(createClient());
      const data = await service.findLatestByBusId(schoolId, busId);
      setLocation(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const startTracking = useCallback(async (busId: string, locationData: GPSLocation) => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScGPSTrackingService(createClient());
      const data = await service.createTracking(schoolId, locationData);
      setLocation(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const stopTracking = useCallback(async (trackingId: string) => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScGPSTrackingService(createClient());
      await service.deleteTracking(schoolId, trackingId);
      setLocation(null);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { location, loading, error, track, startTracking, stopTracking };
};
