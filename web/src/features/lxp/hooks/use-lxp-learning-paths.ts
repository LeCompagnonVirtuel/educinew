'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpLearningPathService } from '../services/lxp-learning-path.service';
import type { LearningPath, LearningPathCreate, LearningPathUpdate } from '@educi/types';
import type { LearningPathQuery } from '../types';

export const useLxpLearningPaths = (schoolId: string) => {
  const [paths, setPaths] = useState<readonly LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaths = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLearningPathService(createClient());
      const data = await service.listLearningPaths(schoolId);
      setPaths(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch learning paths');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchPaths();
  }, [fetchPaths]);

  return { paths, loading, error, refresh: fetchPaths };
};

export const useLxpLearningPath = (schoolId: string, id: string | null) => {
  const [path, setPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPath = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLearningPathService(createClient());
      const data = await service.getLearningPath(schoolId, id);
      setPath(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch learning path');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchPath();
  }, [fetchPath]);

  return { path, loading, error, refresh: fetchPath };
};

export const useLxpLearningPathCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LearningPathCreate): Promise<LearningPath | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLearningPathService(createClient());
      const result = await service.createLearningPath(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create learning path');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpLearningPathUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: LearningPathUpdate): Promise<LearningPath | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLearningPathService(createClient());
      const result = await service.updateLearningPath(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update learning path');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpLearningPathDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLearningPathService(createClient());
      await service.deleteLearningPath(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete learning path');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
