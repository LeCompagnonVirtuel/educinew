'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDataQualityIssueService } from '../services/eduos-data-quality-issue.service';
import { createClient } from '@/lib/supabase/client';
import type { DataQualityIssue } from '@educi/types';

export const useEduOSDataQualityIssueList = (schoolId: string) => {
  const [items, setItems] = useState<DataQualityIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataQualityIssueService(supabase);
      const data = await service.listDataQualityIssues(schoolId);
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