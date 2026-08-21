'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpCompetencyPathService } from '../services/lxp-competency-path.service';
import type { CompetencyPath, CompetencyMapping } from '@educi/types';
import type { CompetencyPathQuery } from '../types';

export const useLxpCompetencyPaths = (schoolId: string) => {
  const [paths, setPaths] = useState<CompetencyPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaths = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCompetencyPathService(createClient());
      const path = await service.getCompetencyPath(schoolId, schoolId);
      setPaths([path]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch competency paths');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchPaths();
  }, [fetchPaths]);

  return { paths, loading, error, refresh: fetchPaths };
};

export const useLxpCompetencyPath = (schoolId: string, learningPathId: string | null) => {
  const [path, setPath] = useState<CompetencyPath | null>(null);
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
      const service = new LxpCompetencyPathService(createClient());
      const data = await service.getCompetencyPath(schoolId, learningPathId);
      setPath(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch competency path');
    } finally {
      setLoading(false);
    }
  }, [schoolId, learningPathId]);

  useEffect(() => {
    fetchPath();
  }, [fetchPath]);

  return { path, loading, error, refresh: fetchPath };
};

export const useLxpCompetencyPathCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (learningPathId: string, competencies: readonly CompetencyMapping[]): Promise<CompetencyPath | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCompetencyPathService(createClient());
      const result = await service.createCompetencyPath(learningPathId, competencies);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create competency path');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpCompetencyPathUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (learningPathId: string, competencies: readonly CompetencyMapping[]): Promise<CompetencyPath | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCompetencyPathService(createClient());
      const result = await service.updateCompetencyPath(learningPathId, competencies);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update competency path');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpCompetencyAssess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assess = useCallback(async (learningPathId: string, userId: string, competencyId: string, score: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCompetencyPathService(createClient());
      const result = await service.assessCompetency(learningPathId, userId, competencyId, score);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assess competency');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { assess, loading, error };
};
