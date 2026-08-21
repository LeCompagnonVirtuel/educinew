'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpCourseService } from '../services/lxp-course.service';
import type { Course, CourseCreate, CourseUpdate, CourseQuery, CourseListResult } from '@educi/types';

export const useLxpCourses = (schoolId: string, query?: CourseQuery) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseService(createClient());
      const result = await service.listCourses(schoolId, query ?? {});
      setCourses(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, [schoolId, query]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, total, refresh: fetchCourses };
};

export const useLxpCourse = (schoolId: string, id: string | null) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseService(createClient());
      const data = await service.getCourse(schoolId, id);
      setCourse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return { course, loading, error, refresh: fetchCourse };
};

export const useLxpCourseCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CourseCreate): Promise<Course | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseService(createClient());
      const result = await service.createCourse(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpCourseUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: CourseUpdate): Promise<Course | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseService(createClient());
      const result = await service.updateCourse(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpCourseDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseService(createClient());
      await service.deleteCourse(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete course');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
