'use client';

import { useState, useCallback } from 'react';
import { GlobalCloudTrafficMirrorService } from '../services/global-cloud-traffic-mirror.service';
import { createClient } from '@/lib/supabase/client';
import type { TrafficMirror } from '@educi/types';

export const useGlobalCloudTrafficMirrorActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<TrafficMirror>): Promise<TrafficMirror | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudTrafficMirrorService(supabase);
      return await service.create(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TrafficMirror>): Promise<TrafficMirror | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudTrafficMirrorService(supabase);
      return await service.update(schoolId, id, data as any);
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
      const service = new GlobalCloudTrafficMirrorService(supabase);
      await service.delete(schoolId, id);
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