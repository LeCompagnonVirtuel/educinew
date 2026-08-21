'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplaceCourseService } from '../services/eduos-marketplace-course.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceCourse } from '@educi/types';

export const useEduOSMarketplaceCourseList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplaceCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceCourseService(supabase);
      const data = await service.listMarketplaceCourses(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
