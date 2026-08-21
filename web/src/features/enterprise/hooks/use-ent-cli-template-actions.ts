'use client';

import { useState, useCallback } from 'react';
import { EntCLITemplateService } from '../services/cli-template.service';
import { createClient } from '@/lib/supabase/client';
import type { CLITemplate, CLITemplateCreate } from '@educi/types';

export const useEntCLITemplateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CLITemplateCreate): Promise<CLITemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCLITemplateService(supabase);
      return await service.createCLITemplate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CLITemplateCreate>): Promise<CLITemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCLITemplateService(supabase);
      return await service.updateCLITemplate(schoolId, id, data);
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
      const service = new EntCLITemplateService(supabase);
      await service.deleteCLITemplate(schoolId, id);
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
