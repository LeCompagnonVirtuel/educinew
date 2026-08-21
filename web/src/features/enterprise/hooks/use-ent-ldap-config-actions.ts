'use client';

import { useState, useCallback } from 'react';
import { EntLDAPConfigService } from '../services/ldap-config.service';
import { createClient } from '@/lib/supabase/client';
import type { LDAPConfig, LDAPConfigCreate } from '@educi/types';

export const useEntLDAPConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LDAPConfigCreate): Promise<LDAPConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLDAPConfigService(supabase);
      return await service.createLDAPConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LDAPConfigCreate>): Promise<LDAPConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLDAPConfigService(supabase);
      return await service.updateLDAPConfig(schoolId, id, data);
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
      const service = new EntLDAPConfigService(supabase);
      await service.deleteLDAPConfig(schoolId, id);
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
