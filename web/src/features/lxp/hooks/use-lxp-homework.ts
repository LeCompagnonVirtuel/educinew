'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpHomeworkService } from '../services/lxp-homework.service';
import type { Homework } from '@educi/types';
import type { HomeworkQuery } from '../types';

export const useLxpHomeworks = (assignmentId: string) => {
  const [homeworks, setHomeworks] = useState<readonly Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHomeworks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpHomeworkService(createClient());
      const data = await service.listHomeworks(assignmentId);
      setHomeworks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch homeworks');
    } finally {
      setLoading(false);
    }
  }, [assignmentId]);

  useEffect(() => {
    fetchHomeworks();
  }, [fetchHomeworks]);

  return { homeworks, loading, error, refresh: fetchHomeworks };
};

export const useLxpHomework = (schoolId: string, id: string | null) => {
  const [homework, setHomework] = useState<Homework | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHomework = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpHomeworkService(createClient());
      const data = await service.getHomework(schoolId, id);
      setHomework(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch homework');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchHomework();
  }, [fetchHomework]);

  return { homework, loading, error, refresh: fetchHomework };
};

export const useLxpHomeworkCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Homework, 'id' | 'createdAt' | 'updatedAt'>): Promise<Homework | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpHomeworkService(createClient());
      const result = await service.createHomework(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create homework');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpHomeworkUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<Homework>): Promise<Homework | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpHomeworkService(createClient());
      const result = await service.updateHomework(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update homework');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpHomeworkDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpHomeworkService(createClient());
      await service.deleteHomework(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete homework');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
