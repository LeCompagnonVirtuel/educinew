'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScKitchenStaffService } from '../services/sc-kitchen-staff.service';
import { createClient } from '@/lib/supabase/client';
import type { KitchenStaff, KitchenStaffCreate } from '@educi/types';

export const useScKitchenStaffList = (schoolId: string) => {
  const [items, setItems] = useState<KitchenStaff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScKitchenStaffService(createClient());
      const data = await service.listStaff(schoolId);
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

export const useScKitchenStaffGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<KitchenStaff | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScKitchenStaffService(createClient());
      const data = await service.getStaff(schoolId, id);
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

export const useScKitchenStaffCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: KitchenStaffCreate): Promise<KitchenStaff | null> => {
    try {
      setLoading(true);
      const service = new ScKitchenStaffService(createClient());
      const result = await service.createStaff(schoolId, data);
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

export const useScKitchenStaffUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<KitchenStaffCreate>): Promise<KitchenStaff | null> => {
    try {
      setLoading(true);
      const service = new ScKitchenStaffService(createClient());
      const result = await service.updateStaff(schoolId, id, data);
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

export const useScKitchenStaffDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScKitchenStaffService(createClient());
      await service.deleteStaff(schoolId, id);
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
