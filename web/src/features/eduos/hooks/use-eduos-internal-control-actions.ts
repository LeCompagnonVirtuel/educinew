'use client';

import { useState, useCallback } from 'react';
import { EduOSInternalControlService } from '../services/eduos-internal-control.service';
import { createClient } from '@/lib/supabase/client';
import type { InternalControl } from '@educi/types';

export const useEduOSInternalControlActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<InternalControl>): Promise<InternalControl | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSInternalControlService(supabase);
      return await service.createInternalControl(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<InternalControl>): Promise<InternalControl | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSInternalControlService(supabase);
      return await service.updateInternalControl(schoolId, id, data);
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
      const service = new EduOSInternalControlService(supabase);
      await service.deleteInternalControl(schoolId, id);
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
