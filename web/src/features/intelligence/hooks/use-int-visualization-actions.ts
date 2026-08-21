'use client';

import { useState, useCallback } from 'react';
import { IntVisualizationService } from '../services/int-visualization.service';
import { createClient } from '@/lib/supabase/client';
import type { Visualization, VisualizationCreate } from '@educi/types';

export const useIntVisualizationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: VisualizationCreate): Promise<Visualization | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntVisualizationService(supabase);
      return await service.createVisualization(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<VisualizationCreate>): Promise<Visualization | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntVisualizationService(supabase);
      return await service.updateVisualization(schoolId, id, data);
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
      const service = new IntVisualizationService(supabase);
      await service.deleteVisualization(schoolId, id);
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