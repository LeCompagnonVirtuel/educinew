'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplaceTemplateService } from '../services/eduos-marketplace-template.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceTemplate } from '@educi/types';

export const useEduOSMarketplaceTemplateList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplaceTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceTemplateService(supabase);
      const data = await service.listMarketplaceTemplates(schoolId);
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
