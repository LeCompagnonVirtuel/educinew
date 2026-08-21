'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpLessonService } from '../services/lxp-lesson.service';
import type { Lesson, LessonCreate, LessonUpdate, LessonFilter } from '@educi/types';

export const useLxpLessons = (moduleId: string, filters?: LessonFilter) => {
  const [lessons, setLessons] = useState<readonly Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLessonService(createClient());
      const data = await service.listLessons(moduleId, filters ?? {});
      setLessons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lessons');
    } finally {
      setLoading(false);
    }
  }, [moduleId, filters]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return { lessons, loading, error, refresh: fetchLessons };
};

export const useLxpLesson = (schoolId: string, id: string | null) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLesson = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLessonService(createClient());
      const data = await service.getLesson(schoolId, id);
      setLesson(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lesson');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  return { lesson, loading, error, refresh: fetchLesson };
};

export const useLxpLessonCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LessonCreate): Promise<Lesson | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLessonService(createClient());
      const result = await service.createLesson(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lesson');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpLessonUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: LessonUpdate): Promise<Lesson | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLessonService(createClient());
      const result = await service.updateLesson(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lesson');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpLessonDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLessonService(createClient());
      await service.deleteLesson(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lesson');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
