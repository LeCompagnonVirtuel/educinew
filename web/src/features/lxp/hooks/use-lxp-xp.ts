'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpXPService } from '../services/lxp-xp.service';
import type { XP, XPTransaction } from '@educi/types';
import type { XPQuery } from '../types';

export const useLxpXP = (userId: string) => {
  const [xp, setXP] = useState<XP | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchXP = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpXPService(createClient());
      const data = await service.getXP(userId);
      setXP(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch XP');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchXP();
  }, [fetchXP]);

  return { xp, loading, error, refresh: fetchXP };
};

export const useLxpXPAward = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const award = useCallback(async (userId: string, amount: number, action: string, description: string): Promise<XP | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpXPService(createClient());
      const result = await service.awardXP(userId, amount, action, description);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to award XP');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { award, loading, error };
};

export const useLxpXPTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTransactions = useCallback(async (userId: string): Promise<readonly XPTransaction[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpXPService(createClient());
      const result = await service.getXPTransactions(userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch XP transactions');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getTransactions, loading, error };
};

export const useLxpXPLeaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLeaderboard = useCallback(async (): Promise<readonly { userId: string; xp: number; level: number }[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpXPService(createClient());
      const result = await service.getXPLeaderboard();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch XP leaderboard');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getLeaderboard, loading, error };
};

export const useLxpUserLevel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLevel = useCallback(async (userId: string): Promise<{ level: number; currentXP: number; nextLevelXP: number } | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpXPService(createClient());
      const result = await service.getUserLevel(userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user level');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getLevel, loading, error };
};
