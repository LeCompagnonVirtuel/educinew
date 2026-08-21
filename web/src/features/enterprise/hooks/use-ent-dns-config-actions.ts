'use client';

import { useState, useCallback } from 'react';
import { EntDNSConfigService } from '../services/dns-config.service';
import { createClient } from '@/lib/supabase/client';
import type { DNSConfig, DNSConfigCreate } from '@educi/types';

export const useEntDNSConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DNSConfigCreate): Promise<DNSConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDNSConfigService(supabase);
      return await service.createDNSConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DNSConfigCreate>): Promise<DNSConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDNSConfigService(supabase);
      return await service.updateDNSConfig(schoolId, id, data);
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
      const service = new EntDNSConfigService(supabase);
      await service.deleteDNSConfig(schoolId, id);
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
