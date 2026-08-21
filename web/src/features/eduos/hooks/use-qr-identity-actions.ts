'use client';

import { useState, useCallback } from 'react';
import { EduOSQRIdentityService } from '../services/eduos-qr-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { QRIdentity } from '@educi/types';

export const useEduOSQRIdentityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<QRIdentity>): Promise<QRIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSQRIdentityService(supabase);
      return await service.createQRIdentity(schoolId, data as QRIdentity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<QRIdentity>): Promise<QRIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSQRIdentityService(supabase);
      return await service.updateQRIdentity(schoolId, id, data);
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
      const service = new EduOSQRIdentityService(supabase);
      await service.deleteQRIdentity(schoolId, id);
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
