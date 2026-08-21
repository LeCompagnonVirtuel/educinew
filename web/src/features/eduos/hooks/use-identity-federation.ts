'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSIdentityFederationService } from '../services/eduos-identity-federation.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityFederation } from '@educi/types';

export const useEduOSIdentityFederationList = (schoolId: string) => {
  const [items, setItems] = useState<IdentityFederation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIdentityFederationService(supabase);
      const data = await service.listIdentityFederations(schoolId);
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
