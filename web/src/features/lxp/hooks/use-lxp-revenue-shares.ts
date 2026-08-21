'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpRevenueShareService } from '../services/lxp-revenue-share.service';
import type { RevenueShare } from '@educi/types';
import type { RevenueShareQuery } from '../types';

export const useLxpRevenueShares = (schoolId: string, publisherId: string) => {
  const [shares, setShares] = useState<readonly RevenueShare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShares = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRevenueShareService(createClient());
      const data = await service.listRevenueShares(schoolId, publisherId);
      setShares(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch revenue shares');
    } finally {
      setLoading(false);
    }
  }, [schoolId, publisherId]);

  useEffect(() => {
    fetchShares();
  }, [fetchShares]);

  return { shares, loading, error, refresh: fetchShares };
};

export const useLxpRevenueShare = (schoolId: string, id: string | null) => {
  const [share, setShare] = useState<RevenueShare | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShare = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRevenueShareService(createClient());
      const data = await service.getRevenueShare(schoolId, id);
      setShare(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch revenue share');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchShare();
  }, [fetchShare]);

  return { share, loading, error, refresh: fetchShare };
};

export const useLxpRevenueShareCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<RevenueShare, 'id' | 'createdAt' | 'updatedAt'>): Promise<RevenueShare | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRevenueShareService(createClient());
      const result = await service.createRevenueShare(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create revenue share');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpRevenueSharePayout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculatePayout = useCallback(async (schoolId: string, publisherId: string, period: string): Promise<{ totalRevenue: number; shareAmount: number; platformFee: number } | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRevenueShareService(createClient());
      const result = await service.calculatePayout(schoolId, publisherId, period);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate payout');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { calculatePayout, loading, error };
};

export const useLxpRevenueShareDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRevenueShareService(createClient());
      await service.deleteRevenueShare(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete revenue share');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
