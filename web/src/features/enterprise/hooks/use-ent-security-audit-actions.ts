'use client';

import { useState, useCallback } from 'react';
import { EntSecurityAuditService } from '../services/security-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityAudit, SecurityAuditCreate } from '@educi/types';

export const useEntSecurityAuditActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SecurityAuditCreate): Promise<SecurityAudit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityAuditService(supabase);
      return await service.createSecurityAudit(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SecurityAuditCreate>): Promise<SecurityAudit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityAuditService(supabase);
      return await service.updateSecurityAudit(schoolId, id, data);
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
      const service = new EntSecurityAuditService(supabase);
      await service.deleteSecurityAudit(schoolId, id);
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
