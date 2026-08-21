'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplaceConsultantService } from '../services/eduos-marketplace-consultant.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceConsultant } from '@educi/types';

export const useEduOSMarketplaceConsultantList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplaceConsultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceConsultantService(supabase);
      const data = await service.listMarketplaceConsultants(schoolId);
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
