'use client';

import { useState, useCallback } from 'react';
import { EntSecurityIncidentService } from '../services/security-incident.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityIncident, SecurityIncidentCreate } from '@educi/types';

export const useEntSecurityIncidentActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SecurityIncidentCreate): Promise<SecurityIncident | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityIncidentService(supabase);
      return await service.createSecurityIncident(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SecurityIncidentCreate>): Promise<SecurityIncident | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityIncidentService(supabase);
      return await service.updateSecurityIncident(schoolId, id, data);
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
      const service = new EntSecurityIncidentService(supabase);
      await service.deleteSecurityIncident(schoolId, id);
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
