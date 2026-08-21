'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentAccreditationService } from '../services/assessment-accreditation.service';
import { createClient } from '@/lib/supabase/client';
import type { Accreditation } from '@educi/types';

export const useAssessmentAccreditationList = (schoolId: string) => {
  const [items, setItems] = useState<Accreditation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAccreditationService(supabase);
      const data = await service.listAccreditations(schoolId);
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