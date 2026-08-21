'use client';

import { useState, useCallback } from 'react';
import { EduOSCRMIntegrationService } from '../services/eduos-crm-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { CRMIntegration } from '@educi/types';

export const useEduOSCRMIntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CRMIntegration): Promise<CRMIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCRMIntegrationService(supabase);
      return await service.createCRMIntegration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CRMIntegration>): Promise<CRMIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCRMIntegrationService(supabase);
      return await service.updateCRMIntegration(schoolId, id, data);
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
      const service = new EduOSCRMIntegrationService(supabase);
      await service.deleteCRMIntegration(schoolId, id);
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