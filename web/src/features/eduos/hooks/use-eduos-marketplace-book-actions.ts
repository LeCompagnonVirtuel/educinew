'use client';

import { useState, useCallback } from 'react';
import { EduOSMarketplaceBookService } from '../services/eduos-marketplace-book.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceBook } from '@educi/types';

export const useEduOSMarketplaceBookActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MarketplaceBook>): Promise<MarketplaceBook | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceBookService(supabase);
      return await service.createMarketplaceBook(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MarketplaceBook>): Promise<MarketplaceBook | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceBookService(supabase);
      return await service.updateMarketplaceBook(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceBookService(supabase);
      await service.deleteMarketplaceBook(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
