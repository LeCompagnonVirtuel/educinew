'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScMealConsumptionService } from '../services/sc-meal-consumption.service';
import { createClient } from '@/lib/supabase/client';
import type { MealConsumption, MealConsumptionCreate } from '@educi/types';

export const useScMealConsumptionList = (schoolId: string) => {
  const [items, setItems] = useState<MealConsumption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScMealConsumptionService(createClient());
      const data = await service.listConsumptions(schoolId);
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

export const useScMealConsumptionGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<MealConsumption | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScMealConsumptionService(createClient());
      const data = await service.getConsumption(schoolId, id);
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

export const useScMealConsumptionCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: MealConsumptionCreate): Promise<MealConsumption | null> => {
    try {
      setLoading(true);
      const service = new ScMealConsumptionService(createClient());
      const result = await service.createConsumption(schoolId, data);
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

export const useScMealConsumptionUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<MealConsumptionCreate>): Promise<MealConsumption | null> => {
    try {
      setLoading(true);
      const service = new ScMealConsumptionService(createClient());
      const result = await service.updateConsumption(schoolId, id, data);
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

export const useScMealConsumptionDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScMealConsumptionService(createClient());
      await service.deleteConsumption(schoolId, id);
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
