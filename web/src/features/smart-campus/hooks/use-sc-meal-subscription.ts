'use client';
import { useState, useCallback } from 'react';
import { ScMealSubscriptionService } from '../services/sc-meal-subscription.service';
import { createClient } from '@/lib/supabase/client';
import type { MealSubscription, MealSubscriptionCreate } from '@educi/types';

export const useScMealSubscription = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = useCallback(async (data: MealSubscriptionCreate): Promise<MealSubscription | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMealSubscriptionService(createClient());
      return await service.createSubscription(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const unsubscribe = useCallback(async (subscriptionId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMealSubscriptionService(createClient());
      await service.deleteSubscription(schoolId, subscriptionId);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getPlans = useCallback(async (): Promise<MealSubscription[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMealSubscriptionService(createClient());
      return await service.listSubscriptions(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, subscribe, unsubscribe, getPlans };
};
