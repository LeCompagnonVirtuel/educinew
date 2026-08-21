'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScMedicalVisitService } from '../services/sc-medical-visit.service';
import { createClient } from '@/lib/supabase/client';
import type { MedicalVisit, MedicalVisitCreate } from '@educi/types';

export const useScMedicalVisitList = (schoolId: string) => {
  const [items, setItems] = useState<MedicalVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScMedicalVisitService(createClient());
      const data = await service.listVisits(schoolId);
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

export const useScMedicalVisitGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<MedicalVisit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScMedicalVisitService(createClient());
      const data = await service.getVisit(schoolId, id);
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

export const useScMedicalVisitCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: MedicalVisitCreate): Promise<MedicalVisit | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalVisitService(createClient());
      const result = await service.createVisit(schoolId, data);
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

export const useScMedicalVisitUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<MedicalVisitCreate>): Promise<MedicalVisit | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalVisitService(createClient());
      const result = await service.updateVisit(schoolId, id, data);
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

export const useScMedicalVisitDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScMedicalVisitService(createClient());
      await service.deleteVisit(schoolId, id);
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
