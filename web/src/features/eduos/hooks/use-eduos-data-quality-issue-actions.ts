'use client';

import { useState, useCallback } from 'react';
import { EduOSDataQualityIssueService } from '../services/eduos-data-quality-issue.service';
import { createClient } from '@/lib/supabase/client';
import type { DataQualityIssue } from '@educi/types';

export const useEduOSDataQualityIssueActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataQualityIssue): Promise<DataQualityIssue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataQualityIssueService(supabase);
      return await service.createDataQualityIssue(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataQualityIssue>): Promise<DataQualityIssue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataQualityIssueService(supabase);
      return await service.updateDataQualityIssue(schoolId, id, data);
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
      const service = new EduOSDataQualityIssueService(supabase);
      await service.deleteDataQualityIssue(schoolId, id);
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