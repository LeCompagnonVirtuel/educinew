'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScVisitorBadgeService } from '../services/sc-visitor-badge.service';
import { createClient } from '@/lib/supabase/client';
import type { VisitorBadge, VisitorBadgeCreate } from '@educi/types';

export const useScVisitorBadgeList = (schoolId: string) => {
  const [items, setItems] = useState<VisitorBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScVisitorBadgeService(createClient());
      const data = await service.listBadges(schoolId);
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

export const useScVisitorBadgeGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<VisitorBadge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScVisitorBadgeService(createClient());
      const data = await service.getBadge(schoolId, id);
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

export const useScVisitorBadgeCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: VisitorBadgeCreate): Promise<VisitorBadge | null> => {
    try {
      setLoading(true);
      const service = new ScVisitorBadgeService(createClient());
      const result = await service.createBadge(schoolId, data);
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

export const useScVisitorBadgeUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<VisitorBadgeCreate>): Promise<VisitorBadge | null> => {
    try {
      setLoading(true);
      const service = new ScVisitorBadgeService(createClient());
      const result = await service.updateBadge(schoolId, id, data);
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

export const useScVisitorBadgeDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScVisitorBadgeService(createClient());
      await service.deleteBadge(schoolId, id);
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
