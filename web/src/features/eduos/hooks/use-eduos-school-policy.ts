'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSSchoolPolicyService } from '../services/eduos-school-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { SchoolPolicy } from '@educi/types';

export const useEduOSSchoolPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<SchoolPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchoolPolicyService(supabase);
      const data = await service.listSchoolPolicies(schoolId);
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
