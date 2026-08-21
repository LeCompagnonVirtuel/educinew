'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScCantineReportService } from '../services/sc-cantine-report.service';
import { createClient } from '@/lib/supabase/client';

interface CantineReport {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export const useScCantineReportList = (schoolId: string) => {
  const [items, setItems] = useState<CantineReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScCantineReportService(createClient());
      const data = await service.listReports(schoolId);
      setItems(data as CantineReport[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { items, loading, error, refresh: fetchData };
};

export const useScCantineReportGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<CantineReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScCantineReportService(createClient());
      const data = await service.getReport(schoolId, id);
      setItem(data as CantineReport);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);
  useEffect(() => { fetchItem(); }, [fetchItem]);
  return { item, loading, error, refresh: fetchItem };
};

export const useScCantineReportCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (_data: Partial<CantineReport>): Promise<CantineReport | null> => {
    try {
      setLoading(true);
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { create, loading, error };
};

export const useScCantineReportUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (_id: string, _data: Partial<CantineReport>): Promise<CantineReport | null> => {
    try {
      setLoading(true);
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { update, loading, error };
};

export const useScCantineReportDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScCantineReportService(createClient());
      await service.deleteReport(schoolId, id);
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
