'use client';

import { useState, useCallback } from 'react';
import { EntPlatformExportService } from '../services/platform-export.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformExport, PlatformExportCreate } from '@educi/types';

export const useEntPlatformExportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformExportCreate): Promise<PlatformExport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformExportService(supabase);
      return await service.createPlatformExport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformExportCreate>): Promise<PlatformExport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformExportService(supabase);
      return await service.updatePlatformExport(schoolId, id, data);
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
      const service = new EntPlatformExportService(supabase);
      await service.deletePlatformExport(schoolId, id);
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
