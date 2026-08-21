'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScMenuService } from '../services/sc-menu.service';
import { createClient } from '@/lib/supabase/client';
import type { Menu, MenuCreate, MenuUpdate } from '@educi/types';

export const useScMenuList = (schoolId: string) => {
  const [items, setItems] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScMenuService(createClient());
      const data = await service.listMenus(schoolId);
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

export const useScMenuGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScMenuService(createClient());
      const data = await service.getMenu(schoolId, id);
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

export const useScMenuCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: MenuCreate): Promise<Menu | null> => {
    try {
      setLoading(true);
      const service = new ScMenuService(createClient());
      const result = await service.createMenu(schoolId, data);
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

export const useScMenuUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: MenuUpdate): Promise<Menu | null> => {
    try {
      setLoading(true);
      const service = new ScMenuService(createClient());
      const result = await service.updateMenu(schoolId, id, data);
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

export const useScMenuDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScMenuService(createClient());
      await service.deleteMenu(schoolId, id);
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
