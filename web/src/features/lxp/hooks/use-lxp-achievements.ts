'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpAchievementService } from '../services/lxp-achievement.service';
import type { Achievement, AchievementCreate } from '@educi/types';
import type { AchievementQuery } from '../types';

export const useLxpAchievements = (schoolId: string) => {
  const [achievements, setAchievements] = useState<readonly Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAchievementService(createClient());
      const data = await service.listAchievements(schoolId);
      setAchievements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return { achievements, loading, error, refresh: fetchAchievements };
};

export const useLxpAchievement = (schoolId: string, id: string | null) => {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievement = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAchievementService(createClient());
      const data = await service.getAchievement(schoolId, id);
      setAchievement(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch achievement');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchAchievement();
  }, [fetchAchievement]);

  return { achievement, loading, error, refresh: fetchAchievement };
};

export const useLxpAchievementCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AchievementCreate): Promise<Achievement | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAchievementService(createClient());
      const result = await service.createAchievement(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create achievement');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpAchievementAward = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const award = useCallback(async (schoolId: string, id: string, userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAchievementService(createClient());
      const result = await service.awardAchievement(schoolId, id, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to award achievement');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { award, loading, error };
};

export const useLxpUserAchievements = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserAchievements = useCallback(async (schoolId: string, userId: string): Promise<readonly Achievement[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAchievementService(createClient());
      const result = await service.getUserAchievements(schoolId, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user achievements');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getUserAchievements, loading, error };
};
