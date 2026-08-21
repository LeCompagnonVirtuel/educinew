'use client';
import { useState, useCallback } from 'react';
import { ScMealOrderService } from '../services/sc-meal-order.service';
import { createClient } from '@/lib/supabase/client';
import type { MealOrder, MealOrderCreate } from '@educi/types';

export const useScMealOrdering = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const order = useCallback(async (data: MealOrderCreate): Promise<MealOrder | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMealOrderService(createClient());
      return await service.createOrder(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const cancel = useCallback(async (orderId: string): Promise<MealOrder | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMealOrderService(createClient());
      return await service.updateOrder(schoolId, orderId, { status: 'cancelled' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getHistory = useCallback(async (): Promise<MealOrder[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMealOrderService(createClient());
      return await service.listOrders(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, order, cancel, getHistory };
};
