'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpLeaderboardService } from '../services/lxp-leaderboard.service';
import type { Leaderboard, LeaderboardEntry } from '@educi/types';
import type { LeaderboardQuery } from '../types';

export const useLxpLeaderboards = (schoolId: string) => {
  const [leaderboards, setLeaderboards] = useState<readonly Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLeaderboardService(createClient());
      const data = await service.listLeaderboards(schoolId);
      setLeaderboards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboards');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchLeaderboards();
  }, [fetchLeaderboards]);

  return { leaderboards, loading, error, refresh: fetchLeaderboards };
};

export const useLxpLeaderboard = (schoolId: string, id: string | null) => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLeaderboardService(createClient());
      const data = await service.getLeaderboard(schoolId, id);
      setLeaderboard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return { leaderboard, loading, error, refresh: fetchLeaderboard };
};

export const useLxpLeaderboardUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string): Promise<Leaderboard | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLeaderboardService(createClient());
      const result = await service.updateLeaderboard(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update leaderboard');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpLeaderboardEntries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEntries = useCallback(async (leaderboardId: string): Promise<readonly LeaderboardEntry[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLeaderboardService(createClient());
      const result = await service.getLeaderboardEntries(leaderboardId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard entries');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getEntries, loading, error };
};

export const useLxpLeaderboardUserRank = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserRank = useCallback(async (leaderboardId: string, userId: string): Promise<LeaderboardEntry | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLeaderboardService(createClient());
      const result = await service.getUserRank(leaderboardId, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user rank');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getUserRank, loading, error };
};
