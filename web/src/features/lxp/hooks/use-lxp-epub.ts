'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpEPUBService } from '../services/lxp-epub.service';
import type { EPUBContent } from '@educi/types';
import type { EPUBQuery } from '../types';

export const useLxpEPUBs = (courseId: string) => {
  const [epubs, setEPUBs] = useState<readonly EPUBContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEPUBs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEPUBService(createClient());
      const data = await service.listEPUBs(courseId);
      setEPUBs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch EPUBs');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchEPUBs();
  }, [fetchEPUBs]);

  return { epubs, loading, error, refresh: fetchEPUBs };
};

export const useLxpEPUB = (schoolId: string, id: string | null) => {
  const [epub, setEPUB] = useState<EPUBContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEPUB = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEPUBService(createClient());
      const data = await service.getEPUB(schoolId, id);
      setEPUB(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch EPUB');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchEPUB();
  }, [fetchEPUB]);

  return { epub, loading, error, refresh: fetchEPUB };
};

export const useLxpEPUBCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (courseId: string, file: File, title: string): Promise<EPUBContent | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEPUBService(createClient());
      const result = await service.uploadEPUB(courseId, file, title);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload EPUB');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpEPUBRenderUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRenderUrl = useCallback(async (schoolId: string, id: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEPUBService(createClient());
      const url = await service.getRenderUrl(schoolId, id);
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get render URL');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getRenderUrl, loading, error };
};

export const useLxpEPUBDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpEPUBService(createClient());
      await service.deleteEPUB(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete EPUB');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
