'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSSchoolIdentityService } from '../services/eduos-school-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { SchoolIdentity } from '@educi/types';

export const useEduOSSchoolIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<SchoolIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchoolIdentityService(supabase);
      const data = await service.listSchoolIdentitys(schoolId);
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
