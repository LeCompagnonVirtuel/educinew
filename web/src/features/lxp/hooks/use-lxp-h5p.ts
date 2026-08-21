'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpH5PService } from '../services/lxp-h5p.service';
import type { H5PContent } from '@educi/types';
import type { H5PQuery } from '../types';

export const useLxpH5PContents = (courseId: string) => {
  const [contents, setContents] = useState<readonly H5PContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpH5PService(createClient());
      const data = await service.listH5PContents(courseId);
      setContents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch H5P contents');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return { contents, loading, error, refresh: fetchContents };
};

export const useLxpH5PContent = (schoolId: string, id: string | null) => {
  const [content, setContent] = useState<H5PContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpH5PService(createClient());
      const data = await service.getH5PContent(schoolId, id);
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch H5P content');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, error, refresh: fetchContent };
};

export const useLxpH5PImport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importContent = useCallback(async (courseId: string, file: File): Promise<H5PContent | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpH5PService(createClient());
      const result = await service.importH5P(courseId, file);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import H5P content');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { importContent, loading, error };
};

export const useLxpH5PEmbedUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEmbedUrl = useCallback(async (schoolId: string, id: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpH5PService(createClient());
      const url = await service.getEmbedUrl(schoolId, id);
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get embed URL');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getEmbedUrl, loading, error };
};

export const useLxpH5PDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpH5PService(createClient());
      await service.deleteH5PContent(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete H5P content');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
