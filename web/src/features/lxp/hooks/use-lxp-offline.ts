'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpOfflineService } from '../services/lxp-offline.service';
import type { OfflinePackage } from '@educi/types';
import type { OfflineQuery } from '../types';

export const useLxpOfflinePackages = (schoolId: string) => {
  const [packages, setPackages] = useState<OfflinePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpOfflineService(createClient());
      const data = await service.getOfflinePackage(schoolId, schoolId);
      setPackages([data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch offline packages');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return { packages, loading, error, refresh: fetchPackages };
};

export const useLxpOfflinePackage = (schoolId: string, courseId: string | null) => {
  const [pkg, setPkg] = useState<OfflinePackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackage = useCallback(async () => {
    if (!courseId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpOfflineService(createClient());
      const data = await service.getOfflinePackage(schoolId, courseId);
      setPkg(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch offline package');
    } finally {
      setLoading(false);
    }
  }, [schoolId, courseId]);

  useEffect(() => {
    fetchPackage();
  }, [fetchPackage]);

  return { pkg, loading, error, refresh: fetchPackage };
};

export const useLxpOfflineGenerate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (courseId: string): Promise<OfflinePackage | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpOfflineService(createClient());
      const result = await service.generateOfflinePackage(courseId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate offline package');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
};

export const useLxpOfflineSync = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sync = useCallback(async (courseId: string, userId: string, progress: Record<string, unknown>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpOfflineService(createClient());
      const result = await service.syncOfflineProgress(courseId, userId, progress);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync offline progress');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sync, loading, error };
};

export const useLxpOfflineDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, courseId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpOfflineService(createClient());
      await service.deleteOfflinePackage(schoolId, courseId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete offline package');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
