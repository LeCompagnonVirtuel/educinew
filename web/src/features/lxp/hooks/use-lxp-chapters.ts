'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpChapterService } from '../services/lxp-chapter.service';
import type { Chapter, ChapterCreate } from '@educi/types';
import type { ChapterUpdate } from '../types';

export const useLxpChapters = (lessonId: string) => {
  const [chapters, setChapters] = useState<readonly Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChapters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChapterService(createClient());
      const data = await service.listChapters(lessonId);
      setChapters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chapters');
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  return { chapters, loading, error, refresh: fetchChapters };
};

export const useLxpChapter = (schoolId: string, id: string | null) => {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChapter = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChapterService(createClient());
      const data = await service.getChapter(schoolId, id);
      setChapter(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chapter');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchChapter();
  }, [fetchChapter]);

  return { chapter, loading, error, refresh: fetchChapter };
};

export const useLxpChapterCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ChapterCreate): Promise<Chapter | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChapterService(createClient());
      const result = await service.createChapter(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create chapter');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpChapterUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: ChapterUpdate): Promise<Chapter | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChapterService(createClient());
      const result = await service.updateChapter(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update chapter');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpChapterDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChapterService(createClient());
      await service.deleteChapter(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete chapter');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
