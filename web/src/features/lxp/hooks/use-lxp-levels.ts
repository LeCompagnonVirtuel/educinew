'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpLevelService } from '../services/lxp-level.service';
import type { Level, LevelCreate } from '@educi/types';
import type { LevelQuery } from '../types';

export const useLxpLevels = (schoolId: string) => {
  const [levels, setLevels] = useState<readonly Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLevels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLevelService(createClient());
      const data = await service.listLevels(schoolId);
      setLevels(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch levels');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  return { levels, loading, error, refresh: fetchLevels };
};

export const useLxpLevel = (schoolId: string, id: string | null) => {
  const [level, setLevel] = useState<Level | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLevel = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLevelService(createClient());
      const data = await service.getLevel(schoolId, id);
      setLevel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch level');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchLevel();
  }, [fetchLevel]);

  return { level, loading, error, refresh: fetchLevel };
};

export const useLxpLevelCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LevelCreate): Promise<Level | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLevelService(createClient());
      const result = await service.createLevel(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create level');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpLevelUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<Level>): Promise<Level | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLevelService(createClient());
      const result = await service.updateLevel(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update level');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpLevelDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLevelService(createClient());
      await service.deleteLevel(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete level');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
