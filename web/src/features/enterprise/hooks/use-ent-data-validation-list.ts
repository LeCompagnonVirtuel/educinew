'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataValidationService } from '../services/data-validation.service';
import { createClient } from '@/lib/supabase/client';
import type { DataValidation } from '@educi/types';

export const useEntDataValidationList = (schoolId: string) => {
  const [items, setItems] = useState<DataValidation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataValidationService(supabase);
      const data = await service.listDataValidations(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
