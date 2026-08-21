'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpSCORMService } from '../services/lxp-scorm.service';
import type { SCORMContent } from '@educi/types';
import type { SCORMQuery } from '../types';

export const useLxpSCORMs = (courseId: string) => {
  const [scorms, setSCORMs] = useState<readonly SCORMContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSCORMs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSCORMService(createClient());
      const data = await service.listSCORMs(courseId);
      setSCORMs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch SCORM packages');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchSCORMs();
  }, [fetchSCORMs]);

  return { scorms, loading, error, refresh: fetchSCORMs };
};

export const useLxpSCORM = (schoolId: string, id: string | null) => {
  const [scorm, setSCORM] = useState<SCORMContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSCORM = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSCORMService(createClient());
      const data = await service.getSCORM(schoolId, id);
      setSCORM(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch SCORM package');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchSCORM();
  }, [fetchSCORM]);

  return { scorm, loading, error, refresh: fetchSCORM };
};

export const useLxpSCORMImport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importPackage = useCallback(async (courseId: string, file: File): Promise<SCORMContent | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSCORMService(createClient());
      const result = await service.importSCORM(courseId, file);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import SCORM package');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { importPackage, loading, error };
};

export const useLxpSCORMExport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportPackage = useCallback(async (schoolId: string, id: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSCORMService(createClient());
      const url = await service.exportSCORM(schoolId, id);
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export SCORM package');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { exportPackage, loading, error };
};

export const useLxpSCORMDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSCORMService(createClient());
      await service.deleteSCORM(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete SCORM package');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
