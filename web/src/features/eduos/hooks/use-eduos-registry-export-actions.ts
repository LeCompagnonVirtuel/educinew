'use client';

import { useState, useCallback } from 'react';
import { EduOSRegistryExportService } from '../services/eduos-registry-export.service';
import { createClient } from '@/lib/supabase/client';
import type { RegistryExport } from '@educi/types';

export const useEduOSRegistryExportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<RegistryExport>): Promise<RegistryExport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRegistryExportService(supabase);
      return await service.createRegistryExport(schoolId, data as RegistryExport);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RegistryExport>): Promise<RegistryExport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRegistryExportService(supabase);
      return await service.updateRegistryExport(schoolId, id, data);
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
      const service = new EduOSRegistryExportService(supabase);
      await service.deleteRegistryExport(schoolId, id);
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
