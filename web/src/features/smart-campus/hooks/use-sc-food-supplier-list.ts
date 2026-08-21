'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScFoodSupplierService } from '../services/sc-food-supplier.service';
import { createClient } from '@/lib/supabase/client';
import type { FoodSupplier, FoodSupplierCreate } from '@educi/types';

export const useScFoodSupplierList = (schoolId: string) => {
  const [items, setItems] = useState<FoodSupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScFoodSupplierService(createClient());
      const data = await service.listSuppliers(schoolId);
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

export const useScFoodSupplierGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<FoodSupplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScFoodSupplierService(createClient());
      const data = await service.getSupplier(schoolId, id);
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

export const useScFoodSupplierCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: FoodSupplierCreate): Promise<FoodSupplier | null> => {
    try {
      setLoading(true);
      const service = new ScFoodSupplierService(createClient());
      const result = await service.createSupplier(schoolId, data);
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

export const useScFoodSupplierUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<FoodSupplierCreate>): Promise<FoodSupplier | null> => {
    try {
      setLoading(true);
      const service = new ScFoodSupplierService(createClient());
      const result = await service.updateSupplier(schoolId, id, data);
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

export const useScFoodSupplierDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScFoodSupplierService(createClient());
      await service.deleteSupplier(schoolId, id);
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
