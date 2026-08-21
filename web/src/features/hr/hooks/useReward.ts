import { useState, useEffect, useCallback } from 'react';
import { createRewardService } from '../services/reward.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Reward } from '../types';

export function useRewards(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createRewardService(repo);
  const [data, setData] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findRewards(schoolId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useReward(supabase: any, schoolId: string, rewardId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createRewardService(repo);
  const [data, setData] = useState<Reward | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!rewardId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findRewardById(schoolId, rewardId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, rewardId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
