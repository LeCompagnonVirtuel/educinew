'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpAdaptivePathService } from '../services/lxp-adaptive-path.service';
import type { AdaptivePath, PersonalizedPath } from '@educi/types';
import type { AdaptivePathQuery } from '../types';

export const useLxpAdaptivePaths = (schoolId: string) => {
  const [paths, setPaths] = useState<AdaptivePath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaths = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAdaptivePathService(createClient());
      const path = await service.getAdaptivePath(schoolId, schoolId);
      setPaths([path]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch adaptive paths');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchPaths();
  }, [fetchPaths]);

  return { paths, loading, error, refresh: fetchPaths };
};

export const useLxpAdaptivePath = (schoolId: string, learningPathId: string | null) => {
  const [path, setPath] = useState<AdaptivePath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPath = useCallback(async () => {
    if (!learningPathId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAdaptivePathService(createClient());
      const data = await service.getAdaptivePath(schoolId, learningPathId);
      setPath(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch adaptive path');
    } finally {
      setLoading(false);
    }
  }, [schoolId, learningPathId]);

  useEffect(() => {
    fetchPath();
  }, [fetchPath]);

  return { path, loading, error, refresh: fetchPath };
};

export const useLxpAdaptivePathCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (learningPathId: string, data: Omit<AdaptivePath, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdaptivePath | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAdaptivePathService(createClient());
      const result = await service.createAdaptivePath(learningPathId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create adaptive path');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpPersonalizedPath = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (learningPathId: string, userId: string): Promise<PersonalizedPath | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAdaptivePathService(createClient());
      const result = await service.generatePersonalizedPath(learningPathId, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate personalized path');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
};

export const useLxpAdaptivePathUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (learningPathId: string, userId: string, progress: number): Promise<PersonalizedPath | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAdaptivePathService(createClient());
      const result = await service.updatePersonalizedPath(learningPathId, userId, progress);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update adaptive path');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};
