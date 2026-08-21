'use client';
import { useState, useCallback } from 'react';
import { ScMedicalVisitService } from '../services/sc-medical-visit.service';
import { createClient } from '@/lib/supabase/client';
import type { MedicalVisit, MedicalVisitCreate } from '@educi/types';

export const useScMedicalVisit = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVisit = useCallback(async (data: MedicalVisitCreate): Promise<MedicalVisit | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMedicalVisitService(createClient());
      return await service.createVisit(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getHistory = useCallback(async (): Promise<MedicalVisit[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMedicalVisitService(createClient());
      return await service.listVisits(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getReports = useCallback(async (filters?: Record<string, unknown>): Promise<MedicalVisit[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMedicalVisitService(createClient());
      return await service.listVisits(schoolId, filters);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, createVisit, getHistory, getReports };
};
