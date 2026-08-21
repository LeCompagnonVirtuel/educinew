'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowAuditTrailService } from '../services/eduos-workflow-audit-trail.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowAuditTrail } from '@educi/types';

export const useEduOSWorkflowAuditTrailActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowAuditTrail>): Promise<WorkflowAuditTrail | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowAuditTrailService(supabase);
      return await service.createWorkflowAuditTrail(schoolId, data as WorkflowAuditTrail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowAuditTrail>): Promise<WorkflowAuditTrail | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowAuditTrailService(supabase);
      return await service.updateWorkflowAuditTrail(schoolId, id, data);
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
      const service = new EduOSWorkflowAuditTrailService(supabase);
      await service.deleteWorkflowAuditTrail(schoolId, id);
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
