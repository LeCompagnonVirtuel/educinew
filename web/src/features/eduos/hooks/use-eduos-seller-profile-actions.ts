'use client';

import { useState, useCallback } from 'react';
import { EduOSSellerProfileService } from '../services/eduos-seller-profile.service';
import { createClient } from '@/lib/supabase/client';
import type { SellerProfile } from '@educi/types';

export const useEduOSSellerProfileActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<SellerProfile>): Promise<SellerProfile | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSellerProfileService(supabase);
      return await service.createSellerProfile(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SellerProfile>): Promise<SellerProfile | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSellerProfileService(supabase);
      return await service.updateSellerProfile(schoolId, id, data);
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
      const service = new EduOSSellerProfileService(supabase);
      await service.deleteSellerProfile(schoolId, id);
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
