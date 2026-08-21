'use client';

import { useState, useCallback } from 'react';
import { EntConnectionPoolService } from '../services/connection-pool.service';
import { createClient } from '@/lib/supabase/client';
import type { ConnectionPool, ConnectionPoolCreate } from '@educi/types';

export const useEntConnectionPoolActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ConnectionPoolCreate): Promise<ConnectionPool | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntConnectionPoolService(supabase);
      return await service.createConnectionPool(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ConnectionPoolCreate>): Promise<ConnectionPool | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntConnectionPoolService(supabase);
      return await service.updateConnectionPool(schoolId, id, data);
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
      const service = new EntConnectionPoolService(supabase);
      await service.deleteConnectionPool(schoolId, id);
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
