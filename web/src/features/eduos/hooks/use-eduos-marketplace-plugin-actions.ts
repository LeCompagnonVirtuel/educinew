'use client';

import { useState, useCallback } from 'react';
import { EduOSMarketplacePluginService } from '../services/eduos-marketplace-plugin.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplacePlugin } from '@educi/types';

export const useEduOSMarketplacePluginActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MarketplacePlugin>): Promise<MarketplacePlugin | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplacePluginService(supabase);
      return await service.createMarketplacePlugin(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MarketplacePlugin>): Promise<MarketplacePlugin | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplacePluginService(supabase);
      return await service.updateMarketplacePlugin(schoolId, id, data);
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
      const service = new EduOSMarketplacePluginService(supabase);
      await service.deleteMarketplacePlugin(schoolId, id);
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
