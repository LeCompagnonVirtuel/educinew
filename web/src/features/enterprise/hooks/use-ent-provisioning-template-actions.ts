'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningTemplateService } from '../services/provisioning-template.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningTemplate, ProvisioningTemplateCreate } from '@educi/types';

export const useEntProvisioningTemplateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningTemplateCreate): Promise<ProvisioningTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningTemplateService(supabase);
      return await service.createProvisioningTemplate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningTemplateCreate>): Promise<ProvisioningTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningTemplateService(supabase);
      return await service.updateProvisioningTemplate(schoolId, id, data);
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
      const service = new EntProvisioningTemplateService(supabase);
      await service.deleteProvisioningTemplate(schoolId, id);
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
