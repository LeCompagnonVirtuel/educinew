'use client';

import { useState, useCallback } from 'react';
import { EntResourceManagerService } from '../services/resource-manager.service';
import { createClient } from '@/lib/supabase/client';
import type { ResourceManager, ResourceManagerCreate } from '@educi/types';

export const useEntResourceManagerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ResourceManagerCreate): Promise<ResourceManager | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntResourceManagerService(supabase);
      return await service.createResourceManager(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ResourceManagerCreate>): Promise<ResourceManager | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntResourceManagerService(supabase);
      return await service.updateResourceManager(schoolId, id, data);
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
      const service = new EntResourceManagerService(supabase);
      await service.deleteResourceManager(schoolId, id);
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
