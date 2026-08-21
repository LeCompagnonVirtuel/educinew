'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSInstitutionRegistryService } from '../services/eduos-institution-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { InstitutionRegistry } from '@educi/types';

export const useEduOSInstitutionRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<InstitutionRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSInstitutionRegistryService(supabase);
      const data = await service.listInstitutionRegistrys(schoolId);
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
