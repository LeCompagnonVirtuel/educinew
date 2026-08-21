'use client';

import { useState, useCallback } from 'react';
import { EntIncidentReviewService } from '../services/incident-review.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentReview, IncidentReviewCreate } from '@educi/types';

export const useEntIncidentReviewActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentReviewCreate): Promise<IncidentReview | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentReviewService(supabase);
      return await service.createIncidentReview(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentReviewCreate>): Promise<IncidentReview | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentReviewService(supabase);
      return await service.updateIncidentReview(schoolId, id, data);
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
      const service = new EntIncidentReviewService(supabase);
      await service.deleteIncidentReview(schoolId, id);
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
