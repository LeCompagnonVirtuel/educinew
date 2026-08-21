'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentReportService } from '../services/incident-report.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentReport } from '@educi/types';

export const useEntIncidentReportList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentReportService(supabase);
      const data = await service.listIncidentReports(schoolId);
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
