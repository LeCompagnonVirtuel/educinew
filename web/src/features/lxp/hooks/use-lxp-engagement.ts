'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpEngagementService } from '../services/lxp-engagement.service';
import type { Engagement, EngagementCreate } from '@educi/types';
import type { EngagementQuery } from '../types';

export const useLxpEngagement = (schoolId: string, userId: string, courseId: string) => {
  const [engagement, setEngagement] = useState<Engagement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEngagement = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEngagementService(createClient());
      const data = await service.getEngagement(schoolId, userId, courseId);
      setEngagement(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch engagement');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId, courseId]);

  useEffect(() => {
    fetchEngagement();
  }, [fetchEngagement]);

  return { engagement, loading, error, refresh: fetchEngagement };
};

export const useLxpEngagementUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (userId: string, courseId: string, data: Partial<EngagementCreate>): Promise<Engagement | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEngagementService(createClient());
      const result = await service.updateEngagement(userId, courseId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update engagement');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpUserEngagements = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserEngagements = useCallback(async (schoolId: string, userId: string): Promise<readonly Engagement[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEngagementService(createClient());
      const result = await service.getUserEngagements(schoolId, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user engagements');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getUserEngagements, loading, error };
};

export const useLxpCourseEngagementStats = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStats = useCallback(async (schoolId: string, courseId: string): Promise<{ averageScore: number; totalUsers: number; distribution: readonly { level: string; count: number }[] } | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEngagementService(createClient());
      const result = await service.getCourseEngagementStats(schoolId, courseId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course engagement stats');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getStats, loading, error };
};

export const useLxpEngagementLeaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLeaderboard = useCallback(async (courseId: string): Promise<readonly { userId: string; score: number }[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEngagementService(createClient());
      const result = await service.getEngagementLeaderboard(courseId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch engagement leaderboard');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getLeaderboard, loading, error };
};
