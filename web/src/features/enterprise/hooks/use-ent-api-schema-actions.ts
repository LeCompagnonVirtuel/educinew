'use client';

import { useState, useCallback } from 'react';
import { EntAPISchemaService } from '../services/api-schema.service';
import { createClient } from '@/lib/supabase/client';
import type { APISchema, APISchemaCreate } from '@educi/types';

export const useEntAPISchemaActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APISchemaCreate): Promise<APISchema | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPISchemaService(supabase);
      return await service.createAPISchema(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APISchemaCreate>): Promise<APISchema | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPISchemaService(supabase);
      return await service.updateAPISchema(schoolId, id, data);
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
      const service = new EntAPISchemaService(supabase);
      await service.deleteAPISchema(schoolId, id);
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
