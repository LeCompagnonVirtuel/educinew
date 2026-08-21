'use client';

import { useState, useCallback } from 'react';
import { EduOSHumanApprovalService } from '../services/eduos-human-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { HumanApproval } from '@educi/types';

export const useEduOSHumanApprovalActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<HumanApproval>): Promise<HumanApproval | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSHumanApprovalService(supabase);
      return await service.createHumanApproval(schoolId, data as HumanApproval);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HumanApproval>): Promise<HumanApproval | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSHumanApprovalService(supabase);
      return await service.updateHumanApproval(schoolId, id, data);
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
      const service = new EduOSHumanApprovalService(supabase);
      await service.deleteHumanApproval(schoolId, id);
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
