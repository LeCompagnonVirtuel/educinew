'use client';

import { useState, useCallback } from 'react';
import { EduOSMarketplaceAnalyticsService } from '../services/eduos-marketplace-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceAnalytics } from '@educi/types';

export const useEduOSMarketplaceAnalyticsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MarketplaceAnalytics>): Promise<MarketplaceAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceAnalyticsService(supabase);
      return await service.createMarketplaceAnalytics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MarketplaceAnalytics>): Promise<MarketplaceAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceAnalyticsService(supabase);
      return await service.updateMarketplaceAnalytics(schoolId, id, data);
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
      const service = new EduOSMarketplaceAnalyticsService(supabase);
      await service.deleteMarketplaceAnalytics(schoolId, id);
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
