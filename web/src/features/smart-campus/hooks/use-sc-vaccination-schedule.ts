'use client';
import { useState, useCallback } from 'react';
import { ScVaccinationService } from '../services/sc-vaccination.service';
import { createClient } from '@/lib/supabase/client';
import type { Vaccination, VaccinationCreate } from '@educi/types';

export const useScVaccinationSchedule = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schedule = useCallback(async (data: VaccinationCreate): Promise<Vaccination | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScVaccinationService(createClient());
      return await service.createVaccination(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const cancel = useCallback(async (vaccinationId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScVaccinationService(createClient());
      await service.deleteVaccination(schoolId, vaccinationId);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getUpcoming = useCallback(async (): Promise<Vaccination[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScVaccinationService(createClient());
      return await service.listVaccinations(schoolId, { status: 'scheduled' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, schedule, cancel, getUpcoming };
};
