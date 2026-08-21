'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpXAPIService } from '../services/lxp-xapi.service';
import type { XAPIContent } from '@educi/types';
import type { XAPIQuery } from '../types';

export const useLxpXAPIContents = (courseId: string) => {
  const [contents, setContents] = useState<readonly XAPIContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpXAPIService(createClient());
      const data = await service.listXAPIContents(courseId);
      setContents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch XAPI contents');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return { contents, loading, error, refresh: fetchContents };
};

export const useLxpXAPIContent = (schoolId: string, id: string | null) => {
  const [content, setContent] = useState<XAPIContent | null>(null);
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
      const service = new LxpXAPIService(createClient());
      const data = await service.getXAPIContent(schoolId, id);
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch XAPI content');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, error, refresh: fetchContent };
};

export const useLxpXAPICreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<XAPIContent, 'id' | 'createdAt' | 'updatedAt'>): Promise<XAPIContent | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpXAPIService(createClient());
      const result = await service.createXAPIContent(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create XAPI content');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpXAPISendStatement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendStatement = useCallback(async (activityId: string, statement: Record<string, unknown>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpXAPIService(createClient());
      const result = await service.sendStatement(activityId, statement);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send XAPI statement');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendStatement, loading, error };
};

export const useLxpXAPIDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpXAPIService(createClient());
      await service.deleteXAPIContent(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete XAPI content');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
