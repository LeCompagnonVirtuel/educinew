'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplaceAIModelService } from '../services/eduos-marketplace-ai-model.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceAIModel } from '@educi/types';

export const useEduOSMarketplaceAIModelList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplaceAIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceAIModelService(supabase);
      const data = await service.listMarketplaceAIModels(schoolId);
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
