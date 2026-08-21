'use client';
import { useState, useCallback } from 'react';
import { ScOccupancyService } from '../services/sc-occupancy.service';
import { createClient } from '@/lib/supabase/client';
import type { Occupancy } from '@educi/types';

export const useScBuildingOccupancy = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOccupancy = useCallback(async (buildingId: string): Promise<Occupancy | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScOccupancyService(createClient());
      const items = await service.listOccupancies(schoolId, { buildingId });
      return items.length > 0 ? items[0] : null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getStats = useCallback(async (): Promise<Occupancy[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScOccupancyService(createClient());
      return await service.listOccupancies(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAvailable = useCallback(async (): Promise<Occupancy[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScOccupancyService(createClient());
      const all = await service.listOccupancies(schoolId);
      return all.filter((o) => o.currentOccupancy < o.maxCapacity);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getOccupancy, getStats, getAvailable };
};
