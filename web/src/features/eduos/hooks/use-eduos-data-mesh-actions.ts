'use client';

import { useState, useCallback } from 'react';
import { EduOSDataMeshService } from '../services/eduos-data-mesh.service';
import { createClient } from '@/lib/supabase/client';
import type { DataMesh } from '@educi/types';

export const useEduOSDataMeshActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataMesh): Promise<DataMesh | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataMeshService(supabase);
      return await service.createDataMesh(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataMesh>): Promise<DataMesh | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataMeshService(supabase);
      return await service.updateDataMesh(schoolId, id, data);
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
      const service = new EduOSDataMeshService(supabase);
      await service.deleteDataMesh(schoolId, id);
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