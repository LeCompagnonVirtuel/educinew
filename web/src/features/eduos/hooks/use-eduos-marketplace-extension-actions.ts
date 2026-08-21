'use client';

import { useState, useCallback } from 'react';
import { EduOSMarketplaceExtensionService } from '../services/eduos-marketplace-extension.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceExtension } from '@educi/types';

export const useEduOSMarketplaceExtensionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MarketplaceExtension>): Promise<MarketplaceExtension | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceExtensionService(supabase);
      return await service.createMarketplaceExtension(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MarketplaceExtension>): Promise<MarketplaceExtension | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceExtensionService(supabase);
      return await service.updateMarketplaceExtension(schoolId, id, data);
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
      const service = new EduOSMarketplaceExtensionService(supabase);
      await service.deleteMarketplaceExtension(schoolId, id);
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
