'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpProjectService } from '../services/lxp-project.service';
import type { Project } from '@educi/types';
import type { ProjectQuery } from '../types';

export const useLxpProjects = (assignmentId: string) => {
  const [projects, setProjects] = useState<readonly Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProjectService(createClient());
      const data = await service.listProjects(assignmentId);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [assignmentId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refresh: fetchProjects };
};

export const useLxpProject = (schoolId: string, id: string | null) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProjectService(createClient());
      const data = await service.getProject(schoolId, id);
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch project');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return { project, loading, error, refresh: fetchProject };
};

export const useLxpProjectCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProjectService(createClient());
      const result = await service.createProject(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpProjectUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<Project>): Promise<Project | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProjectService(createClient());
      const result = await service.updateProject(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpProjectDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpProjectService(createClient());
      await service.deleteProject(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
