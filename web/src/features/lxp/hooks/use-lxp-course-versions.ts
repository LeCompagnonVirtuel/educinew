'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpCourseVersionService } from '../services/lxp-course-version.service';
import type { CourseVersion } from '@educi/types';
import type { CourseVersionCreate, CourseVersionQuery } from '../types';

export const useLxpCourseVersions = (courseId: string) => {
  const [versions, setVersions] = useState<readonly CourseVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVersions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseVersionService(createClient());
      const data = await service.listVersions(courseId);
      setVersions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch versions');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchVersions();
  }, [fetchVersions]);

  return { versions, loading, error, refresh: fetchVersions };
};

export const useLxpCourseVersion = (schoolId: string, courseId: string, versionId: string | null) => {
  const [version, setVersion] = useState<CourseVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVersion = useCallback(async () => {
    if (!versionId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseVersionService(createClient());
      const data = await service.getVersion(schoolId, courseId, versionId);
      setVersion(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch version');
    } finally {
      setLoading(false);
    }
  }, [schoolId, courseId, versionId]);

  useEffect(() => {
    fetchVersion();
  }, [fetchVersion]);

  return { version, loading, error, refresh: fetchVersion };
};

export const useLxpCourseVersionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (courseId: string, changeNotes: string): Promise<CourseVersion | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseVersionService(createClient());
      const result = await service.createVersion(courseId, changeNotes);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create version');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpCourseVersionPublish = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publish = useCallback(async (courseId: string, versionId: string): Promise<CourseVersion | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseVersionService(createClient());
      const result = await service.publishVersion(courseId, versionId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish version');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { publish, loading, error };
};

export const useLxpCourseVersionRevert = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const revert = useCallback(async (courseId: string, versionId: string): Promise<CourseVersion | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseVersionService(createClient());
      const result = await service.revertToVersion(courseId, versionId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revert version');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { revert, loading, error };
};
