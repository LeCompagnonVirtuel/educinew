'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplaceBookService } from '../services/eduos-marketplace-book.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceBook } from '@educi/types';

export const useEduOSMarketplaceBookList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplaceBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceBookService(supabase);
      const data = await service.listMarketplaceBooks(schoolId);
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
