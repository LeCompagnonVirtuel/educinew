'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScLibraryInventoryService } from '../services/sc-library-inventory.service';
import { createClient } from '@/lib/supabase/client';
import type { LibraryInventory, LibraryInventoryCreate } from '@educi/types';

export const useScLibraryInventoryList = (schoolId: string) => {
  const [items, setItems] = useState<LibraryInventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScLibraryInventoryService(createClient());
      const data = await service.listInventory(schoolId);
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

export const useScLibraryInventoryGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<LibraryInventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScLibraryInventoryService(createClient());
      const data = await service.getInventory(schoolId, id);
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

export const useScLibraryInventoryCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: LibraryInventoryCreate): Promise<LibraryInventory | null> => {
    try {
      setLoading(true);
      const service = new ScLibraryInventoryService(createClient());
      const result = await service.createInventory(schoolId, data);
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

export const useScLibraryInventoryUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<LibraryInventoryCreate>): Promise<LibraryInventory | null> => {
    try {
      setLoading(true);
      const service = new ScLibraryInventoryService(createClient());
      const result = await service.updateInventory(schoolId, id, data);
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

export const useScLibraryInventoryDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScLibraryInventoryService(createClient());
      await service.deleteInventory(schoolId, id);
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
