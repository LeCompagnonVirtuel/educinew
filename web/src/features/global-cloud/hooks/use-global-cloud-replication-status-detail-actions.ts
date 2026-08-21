'use client';

import { useState, useCallback } from 'react';
import { GlobalCloudReplicationStatusDetailService } from '../services/global-cloud-replication-status-detail.service';
import { createClient } from '@/lib/supabase/client';
import type { ReplicationStatusDetail } from '@educi/types';

export const useGlobalCloudReplicationStatusDetailActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ReplicationStatusDetail>): Promise<ReplicationStatusDetail | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudReplicationStatusDetailService(supabase);
      return await service.create(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ReplicationStatusDetail>): Promise<ReplicationStatusDetail | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudReplicationStatusDetailService(supabase);
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
      const service = new GlobalCloudReplicationStatusDetailService(supabase);
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