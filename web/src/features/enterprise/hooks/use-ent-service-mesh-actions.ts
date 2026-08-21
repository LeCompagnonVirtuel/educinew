'use client';

import { useState, useCallback } from 'react';
import { EntServiceMeshService } from '../services/service-mesh.service';
import { createClient } from '@/lib/supabase/client';
import type { ServiceMesh, ServiceMeshCreate } from '@educi/types';

export const useEntServiceMeshActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ServiceMeshCreate): Promise<ServiceMesh | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntServiceMeshService(supabase);
      return await service.createServiceMesh(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ServiceMeshCreate>): Promise<ServiceMesh | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntServiceMeshService(supabase);
      return await service.updateServiceMesh(schoolId, id, data);
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
      const service = new EntServiceMeshService(supabase);
      await service.deleteServiceMesh(schoolId, id);
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
