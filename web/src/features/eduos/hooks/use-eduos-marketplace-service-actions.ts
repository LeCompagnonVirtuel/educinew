'use client';

import { useState, useCallback } from 'react';
import { EduOSMarketplaceServiceService } from '../services/eduos-marketplace-service.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceService } from '@educi/types';

export const useEduOSMarketplaceServiceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MarketplaceService>): Promise<MarketplaceService | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceServiceService(supabase);
      return await service.createMarketplaceService(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MarketplaceService>): Promise<MarketplaceService | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceServiceService(supabase);
      return await service.updateMarketplaceService(schoolId, id, data);
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
      const service = new EduOSMarketplaceServiceService(supabase);
      await service.deleteMarketplaceService(schoolId, id);
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
