import { useState, useCallback } from 'react';
import { createReportService } from '../services/report.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useHrReport(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createReportService(repo);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmployeeReport = useCallback(async (schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.generateEmployeeReport(schoolId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateLeaveReport = useCallback(async (schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.generateLeaveReport(schoolId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateContractReport = useCallback(async (schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.generateContractReport(schoolId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateTrainingReport = useCallback(async (schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.generateTrainingReport(schoolId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, generateEmployeeReport, generateLeaveReport, generateContractReport, generateTrainingReport };
}
