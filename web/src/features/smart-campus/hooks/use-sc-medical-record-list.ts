'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScMedicalRecordService } from '../services/sc-medical-record.service';
import { createClient } from '@/lib/supabase/client';
import type { MedicalRecord, MedicalRecordCreate, MedicalRecordUpdate } from '@educi/types';

export const useScMedicalRecordList = (schoolId: string) => {
  const [items, setItems] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScMedicalRecordService(createClient());
      const data = await service.listMedicalRecords(schoolId);
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

export const useScMedicalRecordGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScMedicalRecordService(createClient());
      const data = await service.getMedicalRecord(schoolId, id);
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

export const useScMedicalRecordCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: MedicalRecordCreate): Promise<MedicalRecord | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalRecordService(createClient());
      const result = await service.createMedicalRecord(schoolId, data);
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

export const useScMedicalRecordUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: MedicalRecordUpdate): Promise<MedicalRecord | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalRecordService(createClient());
      const result = await service.updateMedicalRecord(schoolId, id, data);
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

export const useScMedicalRecordDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScMedicalRecordService(createClient());
      await service.deleteMedicalRecord(schoolId, id);
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
