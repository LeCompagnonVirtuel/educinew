'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScEmergencyAlertService } from '../services/sc-emergency-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { EmergencyAlert, EmergencyAlertCreate } from '@educi/types';

export const useScEmergencyAlertList = (schoolId: string) => {
  const [items, setItems] = useState<EmergencyAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScEmergencyAlertService(createClient());
      const data = await service.listAlerts(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { items, loading, error, refresh: fetchData };
};

export const useScEmergencyAlertGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<EmergencyAlert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScEmergencyAlertService(createClient());
      const data = await service.getAlert(schoolId, id);
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);
  useEffect(() => { fetchItem(); }, [fetchItem]);
  return { item, loading, error, refresh: fetchItem };
};

export const useScEmergencyAlertCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: EmergencyAlertCreate): Promise<EmergencyAlert | null> => {
    try {
      setLoading(true);
      const service = new ScEmergencyAlertService(createClient());
      const result = await service.createAlert(schoolId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { create, loading, error };
};

export const useScEmergencyAlertUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<EmergencyAlertCreate>): Promise<EmergencyAlert | null> => {
    try {
      setLoading(true);
      const service = new ScEmergencyAlertService(createClient());
      const result = await service.updateAlert(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { update, loading, error };
};

export const useScEmergencyAlertDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScEmergencyAlertService(createClient());
      await service.deleteAlert(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { remove, loading, error };
};
