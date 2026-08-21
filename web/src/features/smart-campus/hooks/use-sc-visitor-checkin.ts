'use client';
import { useState, useCallback } from 'react';
import { ScVisitorRegistrationService } from '../services/sc-visitor-registration.service';
import { createClient } from '@/lib/supabase/client';
import type { VisitorRegistration, VisitorRegistrationCreate } from '@educi/types';

export const useScVisitorCheckin = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkIn = useCallback(async (data: VisitorRegistrationCreate): Promise<VisitorRegistration | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScVisitorRegistrationService(createClient());
      return await service.createRegistration(schoolId, { ...data, checkInTime: new Date().toISOString() });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const checkOut = useCallback(async (registrationId: string): Promise<VisitorRegistration | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScVisitorRegistrationService(createClient());
      return await service.updateRegistration(schoolId, registrationId, { checkOutTime: new Date().toISOString() });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getHistory = useCallback(async (): Promise<VisitorRegistration[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScVisitorRegistrationService(createClient());
      return await service.listRegistrations(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, checkIn, checkOut, getHistory };
};
