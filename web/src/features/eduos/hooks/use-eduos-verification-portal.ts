'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSVerificationPortalService } from '../services/eduos-verification-portal.service';
import { createClient } from '@/lib/supabase/client';
import type { VerificationPortal } from '@educi/types';

export const useEduOSVerificationPortalList = (schoolId: string) => {
  const [items, setItems] = useState<VerificationPortal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVerificationPortalService(supabase);
      const data = await service.listVerificationPortals(schoolId);
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
