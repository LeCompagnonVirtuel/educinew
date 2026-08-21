'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSTeacherIdentityService } from '../services/eduos-teacher-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { TeacherIdentity } from '@educi/types';

export const useEduOSTeacherIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<TeacherIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTeacherIdentityService(supabase);
      const data = await service.listTeacherIdentitys(schoolId);
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
