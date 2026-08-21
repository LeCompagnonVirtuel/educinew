'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSNationalEducationIdentityService } from '../services/eduos-national-education-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { NationalEducationIdentity } from '@educi/types';

export const useEduOSNationalEducationIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<NationalEducationIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNationalEducationIdentityService(supabase);
      const data = await service.listNationalEducationIdentitys(schoolId);
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
