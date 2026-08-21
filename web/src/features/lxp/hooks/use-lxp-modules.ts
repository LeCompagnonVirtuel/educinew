'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpModuleService } from '../services/lxp-module.service';
import type { CourseModule, ModuleCreate, ModuleUpdate, ModuleFilter } from '@educi/types';

export const useLxpModules = (courseId: string, filters?: ModuleFilter) => {
  const [modules, setModules] = useState<readonly CourseModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpModuleService(createClient());
      const data = await service.listModules(courseId, filters ?? {});
      setModules(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch modules');
    } finally {
      setLoading(false);
    }
  }, [courseId, filters]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return { modules, loading, error, refresh: fetchModules };
};

export const useLxpModule = (schoolId: string, id: string | null) => {
  const [module, setModule] = useState<CourseModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModule = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpModuleService(createClient());
      const data = await service.getModule(schoolId, id);
      setModule(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch module');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchModule();
  }, [fetchModule]);

  return { module, loading, error, refresh: fetchModule };
};

export const useLxpModuleCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ModuleCreate): Promise<CourseModule | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpModuleService(createClient());
      const result = await service.createModule(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create module');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpModuleUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: ModuleUpdate): Promise<CourseModule | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpModuleService(createClient());
      const result = await service.updateModule(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update module');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpModuleDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpModuleService(createClient());
      await service.deleteModule(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete module');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
