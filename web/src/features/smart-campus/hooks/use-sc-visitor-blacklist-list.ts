'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScVisitorBlacklistService } from '../services/sc-visitor-blacklist.service';
import { createClient } from '@/lib/supabase/client';
import type { VisitorBlacklist, VisitorBlacklistCreate } from '@educi/types';

export const useScVisitorBlacklistList = (schoolId: string) => {
  const [items, setItems] = useState<VisitorBlacklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScVisitorBlacklistService(createClient());
      const data = await service.listBlacklist(schoolId);
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

export const useScVisitorBlacklistGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<VisitorBlacklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScVisitorBlacklistService(createClient());
      const data = await service.getBlacklist(schoolId, id);
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

export const useScVisitorBlacklistCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: VisitorBlacklistCreate): Promise<VisitorBlacklist | null> => {
    try {
      setLoading(true);
      const service = new ScVisitorBlacklistService(createClient());
      const result = await service.createBlacklist(schoolId, data);
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

export const useScVisitorBlacklistUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<VisitorBlacklistCreate>): Promise<VisitorBlacklist | null> => {
    try {
      setLoading(true);
      const service = new ScVisitorBlacklistService(createClient());
      const result = await service.updateBlacklist(schoolId, id, data);
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

export const useScVisitorBlacklistDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScVisitorBlacklistService(createClient());
      await service.deleteBlacklist(schoolId, id);
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
