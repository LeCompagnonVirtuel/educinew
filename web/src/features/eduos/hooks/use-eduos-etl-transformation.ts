'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSETLTransformationService } from '../services/eduos-etl-transformation.service';
import { createClient } from '@/lib/supabase/client';
import type { ETLTransformation } from '@educi/types';

export const useEduOSETLTransformationList = (schoolId: string) => {
  const [items, setItems] = useState<ETLTransformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSETLTransformationService(supabase);
      const data = await service.listETLTransformations(schoolId);
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