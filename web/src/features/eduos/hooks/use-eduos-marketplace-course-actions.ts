'use client';

import { useState, useCallback } from 'react';
import { EduOSMarketplaceCourseService } from '../services/eduos-marketplace-course.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceCourse } from '@educi/types';

export const useEduOSMarketplaceCourseActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MarketplaceCourse>): Promise<MarketplaceCourse | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceCourseService(supabase);
      return await service.createMarketplaceCourse(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MarketplaceCourse>): Promise<MarketplaceCourse | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceCourseService(supabase);
      return await service.updateMarketplaceCourse(schoolId, id, data);
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
      const service = new EduOSMarketplaceCourseService(supabase);
      await service.deleteMarketplaceCourse(schoolId, id);
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
