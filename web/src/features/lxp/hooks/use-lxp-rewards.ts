'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpRewardService } from '../services/lxp-reward.service';
import type { Reward, RewardCreate } from '@educi/types';
import type { RewardQuery } from '../types';

export const useLxpRewards = (schoolId: string) => {
  const [rewards, setRewards] = useState<readonly Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRewards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRewardService(createClient());
      const data = await service.listRewards(schoolId);
      setRewards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rewards');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

  return { rewards, loading, error, refresh: fetchRewards };
};

export const useLxpReward = (schoolId: string, id: string | null) => {
  const [reward, setReward] = useState<Reward | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReward = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRewardService(createClient());
      const data = await service.getReward(schoolId, id);
      setReward(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reward');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchReward();
  }, [fetchReward]);

  return { reward, loading, error, refresh: fetchReward };
};

export const useLxpRewardCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: RewardCreate): Promise<Reward | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRewardService(createClient());
      const result = await service.createReward(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create reward');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpRewardRedeem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redeem = useCallback(async (schoolId: string, id: string, userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRewardService(createClient());
      const result = await service.redeemReward(schoolId, id, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to redeem reward');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { redeem, loading, error };
};

export const useLxpRewardDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRewardService(createClient());
      await service.deleteReward(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete reward');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
