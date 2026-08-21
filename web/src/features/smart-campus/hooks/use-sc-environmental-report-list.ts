'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScEnvironmentalReportService } from '../services/sc-environmental-report.service';
import { createClient } from '@/lib/supabase/client';
import type { EnvironmentalReport } from '@educi/types';

export const useScEnvironmentalReportList = (schoolId: string) => {
  const [reports, setReports] = useState<EnvironmentalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScEnvironmentalReportService(createClient());
      const data = await service.listReports(schoolId);
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { reports, loading, error, refresh: fetchReports };
};
