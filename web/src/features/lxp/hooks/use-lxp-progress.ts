'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpProgressService } from '../services/lxp-progress.service';
import type { Progress, ProgressCreate, Completion } from '@educi/types';
import type { ProgressQuery } from '../types';

export const useLxpProgress = (schoolId: string, userId: string, courseId: string) => {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProgressService(createClient());
      const data = await service.getProgress(schoolId, userId, courseId);
      setProgress(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId, courseId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refresh: fetchProgress };
};

export const useLxpProgressUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (userId: string, courseId: string, data: Partial<ProgressCreate>): Promise<Progress | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProgressService(createClient());
      const result = await service.updateProgress(userId, courseId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpProgressCompletion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recordCompletion = useCallback(async (userId: string, courseId: string, data: Omit<Completion, 'id' | 'createdAt' | 'completedAt'>): Promise<Completion | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProgressService(createClient());
      const result = await service.recordCompletion(userId, courseId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record completion');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { recordCompletion, loading, error };
};

export const useLxpUserCourseProgress = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserCourseProgress = useCallback(async (schoolId: string, userId: string): Promise<readonly Progress[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProgressService(createClient());
      const result = await service.getUserCourseProgress(schoolId, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user course progress');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getUserCourseProgress, loading, error };
};

export const useLxpCourseCompletionStats = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStats = useCallback(async (schoolId: string, courseId: string): Promise<{ total: number; completed: number; inProgress: number } | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProgressService(createClient());
      const result = await service.getCourseCompletionStats(schoolId, courseId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course completion stats');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getStats, loading, error };
};
