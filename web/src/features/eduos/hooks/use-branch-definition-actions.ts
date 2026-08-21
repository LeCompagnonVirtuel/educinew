'use client';

import { useState, useCallback } from 'react';
import { EduOSBranchDefinitionService } from '../services/eduos-branch-definition.service';
import { createClient } from '@/lib/supabase/client';
import type { BranchDefinition } from '@educi/types';

export const useEduOSBranchDefinitionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<BranchDefinition>): Promise<BranchDefinition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBranchDefinitionService(supabase);
      return await service.createBranchDefinition(schoolId, data as BranchDefinition);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BranchDefinition>): Promise<BranchDefinition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBranchDefinitionService(supabase);
      return await service.updateBranchDefinition(schoolId, id, data);
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
      const service = new EduOSBranchDefinitionService(supabase);
      await service.deleteBranchDefinition(schoolId, id);
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
