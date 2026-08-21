'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpRubricService } from '../services/lxp-rubric.service';
import type { Rubric, RubricCriterion } from '@educi/types';
import type { RubricQuery } from '../types';

export const useLxpRubrics = (courseId: string) => {
  const [rubrics, setRubrics] = useState<readonly Rubric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRubrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRubricService(createClient());
      const data = await service.listRubrics(courseId);
      setRubrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rubrics');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchRubrics();
  }, [fetchRubrics]);

  return { rubrics, loading, error, refresh: fetchRubrics };
};

export const useLxpRubric = (schoolId: string, id: string | null) => {
  const [rubric, setRubric] = useState<Rubric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRubric = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRubricService(createClient());
      const data = await service.getRubric(schoolId, id);
      setRubric(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rubric');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchRubric();
  }, [fetchRubric]);

  return { rubric, loading, error, refresh: fetchRubric };
};

export const useLxpRubricCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Rubric, 'id' | 'createdAt' | 'updatedAt' | 'isPublished' | 'createdBy'>): Promise<Rubric | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRubricService(createClient());
      const result = await service.createRubric(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create rubric');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpRubricUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<Rubric>): Promise<Rubric | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRubricService(createClient());
      const result = await service.updateRubric(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update rubric');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpRubricDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpRubricService(createClient());
      await service.deleteRubric(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete rubric');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
