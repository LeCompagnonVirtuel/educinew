'use client';

import { useState, useCallback } from 'react';
import { EduOSMarketplaceAIModelService } from '../services/eduos-marketplace-ai-model.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceAIModel } from '@educi/types';

export const useEduOSMarketplaceAIModelActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MarketplaceAIModel>): Promise<MarketplaceAIModel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceAIModelService(supabase);
      return await service.createMarketplaceAIModel(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MarketplaceAIModel>): Promise<MarketplaceAIModel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceAIModelService(supabase);
      return await service.updateMarketplaceAIModel(schoolId, id, data);
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
      const service = new EduOSMarketplaceAIModelService(supabase);
      await service.deleteMarketplaceAIModel(schoolId, id);
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
