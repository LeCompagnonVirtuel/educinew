'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSParentIdentityService } from '../services/eduos-parent-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { ParentIdentity } from '@educi/types';

export const useEduOSParentIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<ParentIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSParentIdentityService(supabase);
      const data = await service.listParentIdentitys(schoolId);
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
