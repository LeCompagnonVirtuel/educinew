'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScBookAcquisitionService } from '../services/sc-book-acquisition.service';
import { createClient } from '@/lib/supabase/client';
import type { BookAcquisition, BookAcquisitionCreate } from '@educi/types';

export const useScBookAcquisitionList = (schoolId: string) => {
  const [items, setItems] = useState<BookAcquisition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScBookAcquisitionService(createClient());
      const data = await service.listAcquisitions(schoolId);
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

export const useScBookAcquisitionGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<BookAcquisition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScBookAcquisitionService(createClient());
      const data = await service.getAcquisition(schoolId, id);
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

export const useScBookAcquisitionCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: BookAcquisitionCreate): Promise<BookAcquisition | null> => {
    try {
      setLoading(true);
      const service = new ScBookAcquisitionService(createClient());
      const result = await service.createAcquisition(schoolId, data);
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

export const useScBookAcquisitionUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<BookAcquisitionCreate>): Promise<BookAcquisition | null> => {
    try {
      setLoading(true);
      const service = new ScBookAcquisitionService(createClient());
      const result = await service.updateAcquisition(schoolId, id, data);
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

export const useScBookAcquisitionDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScBookAcquisitionService(createClient());
      await service.deleteAcquisition(schoolId, id);
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
