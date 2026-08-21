'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSStudentIdentityService } from '../services/eduos-student-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { StudentIdentity } from '@educi/types';

export const useEduOSStudentIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<StudentIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStudentIdentityService(supabase);
      const data = await service.listStudentIdentitys(schoolId);
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
