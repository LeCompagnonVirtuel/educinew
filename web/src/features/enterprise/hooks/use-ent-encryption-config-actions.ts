'use client';

import { useState, useCallback } from 'react';
import { EntEncryptionConfigService } from '../services/encryption-config.service';
import { createClient } from '@/lib/supabase/client';
import type { EncryptionConfig, EncryptionConfigCreate } from '@educi/types';

export const useEntEncryptionConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: EncryptionConfigCreate): Promise<EncryptionConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntEncryptionConfigService(supabase);
      return await service.createEncryptionConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EncryptionConfigCreate>): Promise<EncryptionConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntEncryptionConfigService(supabase);
      return await service.updateEncryptionConfig(schoolId, id, data);
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
      const service = new EntEncryptionConfigService(supabase);
      await service.deleteEncryptionConfig(schoolId, id);
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
