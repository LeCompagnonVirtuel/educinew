'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBiometricIdentityService } from '../services/eduos-biometric-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { BiometricIdentity } from '@educi/types';

export const useEduOSBiometricIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<BiometricIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBiometricIdentityService(supabase);
      const data = await service.listBiometricIdentitys(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
