'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntSecurityService } from '../services/int-security.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceSecurity } from '@educi/types';

export const useIntSecurityList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligenceSecurity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntSecurityService(supabase);
      const data = await service.listSecurities(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};