'use client';

import { useState, useCallback } from 'react';
import { EduOSRegistryBulkImportService } from '../services/eduos-registry-bulk-import.service';
import { createClient } from '@/lib/supabase/client';
import type { RegistryBulkImport } from '@educi/types';

export const useEduOSRegistryBulkImportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<RegistryBulkImport>): Promise<RegistryBulkImport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRegistryBulkImportService(supabase);
      return await service.createRegistryBulkImport(schoolId, data as RegistryBulkImport);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RegistryBulkImport>): Promise<RegistryBulkImport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRegistryBulkImportService(supabase);
      return await service.updateRegistryBulkImport(schoolId, id, data);
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
      const service = new EduOSRegistryBulkImportService(supabase);
      await service.deleteRegistryBulkImport(schoolId, id);
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
