'use client';

import { useState, useCallback } from 'react';
import { IntSecurityService } from '../services/int-security.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceSecurity, IntelligenceSecurityCreate } from '@educi/types';

export const useIntSecurityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceSecurityCreate): Promise<IntelligenceSecurity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntSecurityService(supabase);
      return await service.createSecurity(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceSecurityCreate>): Promise<IntelligenceSecurity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntSecurityService(supabase);
      return await service.updateSecurity(schoolId, id, data);
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
      const service = new IntSecurityService(supabase);
      await service.deleteSecurity(schoolId, id);
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