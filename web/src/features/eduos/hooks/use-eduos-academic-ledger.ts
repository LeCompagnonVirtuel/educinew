'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAcademicLedgerService } from '../services/eduos-academic-ledger.service';
import { createClient } from '@/lib/supabase/client';
import type { AcademicLedger } from '@educi/types';

export const useEduOSAcademicLedgerList = (schoolId: string) => {
  const [items, setItems] = useState<AcademicLedger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAcademicLedgerService(supabase);
      const data = await service.listAcademicLedgers(schoolId);
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
