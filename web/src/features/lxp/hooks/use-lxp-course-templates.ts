'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpCourseTemplateService } from '../services/lxp-course-template.service';
import type { CourseTemplate, CourseTemplateQuery, CourseTemplateListResult } from '@educi/types';
import type { CourseTemplateCreate } from '../types';

export const useLxpCourseTemplates = (schoolId: string, query?: CourseTemplateQuery) => {
  const [templates, setTemplates] = useState<CourseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseTemplateService(createClient());
      const result = await service.listTemplates(schoolId, query ?? {});
      setTemplates(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  }, [schoolId, query]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return { templates, loading, error, total, refresh: fetchTemplates };
};

export const useLxpCourseTemplate = (schoolId: string, id: string | null) => {
  const [template, setTemplate] = useState<CourseTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplate = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseTemplateService(createClient());
      const data = await service.getTemplate(schoolId, id);
      setTemplate(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch template');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchTemplate();
  }, [fetchTemplate]);

  return { template, loading, error, refresh: fetchTemplate };
};

export const useLxpCourseTemplateCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<CourseTemplate, 'id' | 'createdAt' | 'updatedAt' | 'usageCount' | 'moduleCount' | 'lessonCount'>): Promise<CourseTemplate | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseTemplateService(createClient());
      const result = await service.createTemplate(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create template');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpCourseTemplateApply = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apply = useCallback(async (schoolId: string, templateId: string, courseId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseTemplateService(createClient());
      await service.applyTemplate(schoolId, templateId, courseId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply template');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { apply, loading, error };
};

export const useLxpCourseTemplateDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCourseTemplateService(createClient());
      await service.deleteTemplate(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete template');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
