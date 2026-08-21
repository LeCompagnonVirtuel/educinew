'use client';
import { useState, useCallback } from 'react';
import { ScEmergencyAlertService } from '../services/sc-emergency-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { EmergencyAlert, EmergencyAlertCreate } from '@educi/types';

export const useScEmergencyResponse = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trigger = useCallback(async (data: EmergencyAlertCreate): Promise<EmergencyAlert | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEmergencyAlertService(createClient());
      return await service.createAlert(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAlerts = useCallback(async (): Promise<EmergencyAlert[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEmergencyAlertService(createClient());
      return await service.listAlerts(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const acknowledge = useCallback(async (alertId: string): Promise<EmergencyAlert | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEmergencyAlertService(createClient());
      return await service.updateAlert(schoolId, alertId, { status: 'acknowledged' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, trigger, getAlerts, acknowledge };
};
