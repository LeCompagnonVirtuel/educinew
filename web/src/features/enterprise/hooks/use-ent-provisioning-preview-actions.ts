'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningPreviewService } from '../services/provisioning-preview.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningPreview, ProvisioningPreviewCreate } from '@educi/types';

export const useEntProvisioningPreviewActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningPreviewCreate): Promise<ProvisioningPreview | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningPreviewService(supabase);
      return await service.createProvisioningPreview(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningPreviewCreate>): Promise<ProvisioningPreview | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningPreviewService(supabase);
      return await service.updateProvisioningPreview(schoolId, id, data);
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
      const service = new EntProvisioningPreviewService(supabase);
      await service.deleteProvisioningPreview(schoolId, id);
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
