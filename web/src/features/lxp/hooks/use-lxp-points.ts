'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpPointsService } from '../services/lxp-points.service';
import type { Points } from '@educi/types';
import type { PointsQuery } from '../types';

export const useLxpPoints = (schoolId: string, userId: string) => {
  const [points, setPoints] = useState<Points | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoints = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPointsService(createClient());
      const data = await service.getPoints(schoolId, userId);
      setPoints(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch points');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId]);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  return { points, loading, error, refresh: fetchPoints };
};

export const useLxpPointsAward = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const award = useCallback(async (userId: string, schoolId: string, amount: number, description: string): Promise<Points | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPointsService(createClient());
      const result = await service.awardPoints(userId, schoolId, amount, description);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to award points');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { award, loading, error };
};

export const useLxpPointsSpend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const spend = useCallback(async (userId: string, schoolId: string, amount: number, description: string): Promise<Points | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPointsService(createClient());
      const result = await service.spendPoints(userId, schoolId, amount, description);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to spend points');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { spend, loading, error };
};

export const useLxpPointsHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getHistory = useCallback(async (schoolId: string, userId: string): Promise<readonly Points[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPointsService(createClient());
      const result = await service.getPointsHistory(schoolId, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch points history');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getHistory, loading, error };
};

export const useLxpPointsLeaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLeaderboard = useCallback(async (schoolId: string): Promise<readonly { userId: string; points: number }[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPointsService(createClient());
      const result = await service.getPointsLeaderboard(schoolId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch points leaderboard');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getLeaderboard, loading, error };
};
