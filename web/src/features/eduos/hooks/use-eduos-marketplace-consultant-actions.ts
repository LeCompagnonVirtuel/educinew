'use client';

import { useState, useCallback } from 'react';
import { EduOSMarketplaceConsultantService } from '../services/eduos-marketplace-consultant.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceConsultant } from '@educi/types';

export const useEduOSMarketplaceConsultantActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MarketplaceConsultant>): Promise<MarketplaceConsultant | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceConsultantService(supabase);
      return await service.createMarketplaceConsultant(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MarketplaceConsultant>): Promise<MarketplaceConsultant | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceConsultantService(supabase);
      return await service.updateMarketplaceConsultant(schoolId, id, data);
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
      const service = new EduOSMarketplaceConsultantService(supabase);
      await service.deleteMarketplaceConsultant(schoolId, id);
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
