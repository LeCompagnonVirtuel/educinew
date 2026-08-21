'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScMedicalHistoryService } from '../services/sc-medical-history.service';
import { createClient } from '@/lib/supabase/client';
import type { MedicalHistory, MedicalHistoryCreate } from '@educi/types';

export const useScMedicalHistoryList = (schoolId: string) => {
  const [items, setItems] = useState<MedicalHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScMedicalHistoryService(createClient());
      const data = await service.listHistory(schoolId);
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

export const useScMedicalHistoryGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<MedicalHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScMedicalHistoryService(createClient());
      const data = await service.getHistory(schoolId, id);
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

export const useScMedicalHistoryCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: MedicalHistoryCreate): Promise<MedicalHistory | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalHistoryService(createClient());
      const result = await service.createHistory(schoolId, data);
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

export const useScMedicalHistoryUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<MedicalHistoryCreate>): Promise<MedicalHistory | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalHistoryService(createClient());
      const result = await service.updateHistory(schoolId, id, data);
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

export const useScMedicalHistoryDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScMedicalHistoryService(createClient());
      await service.deleteHistory(schoolId, id);
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
