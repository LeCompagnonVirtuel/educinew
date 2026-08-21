'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentDigitalDiplomaService } from '../services/assessment-digital-diploma.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalDiploma } from '@educi/types';

export const useAssessmentDigitalDiplomaList = (schoolId: string) => {
  const [items, setItems] = useState<DigitalDiploma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentDigitalDiplomaService(supabase);
      const data = await service.listDigitalDiplomas(schoolId);
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