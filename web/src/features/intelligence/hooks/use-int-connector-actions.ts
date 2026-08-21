'use client';

import { useState, useCallback } from 'react';
import { IntConnectorService } from '../services/int-connector.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceConnector, IntelligenceConnectorCreate } from '@educi/types';

export const useIntConnectorActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceConnectorCreate): Promise<IntelligenceConnector | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntConnectorService(supabase);
      return await service.createConnector(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceConnectorCreate>): Promise<IntelligenceConnector | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntConnectorService(supabase);
      return await service.updateConnector(schoolId, id, data);
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
      const service = new IntConnectorService(supabase);
      await service.deleteConnector(schoolId, id);
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