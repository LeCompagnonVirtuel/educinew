'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpAssignmentService } from '../services/lxp-assignment.service';
import type { Assignment, AssignmentCreate, AssignmentUpdate, AssignmentQuery, AssignmentListResult } from '@educi/types';

export const useLxpAssignments = (courseId: string, query?: AssignmentQuery) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchAssignments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAssignmentService(createClient());
      const result = await service.listAssignments(courseId, query ?? {});
      setAssignments(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  }, [courseId, query]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return { assignments, loading, error, total, refresh: fetchAssignments };
};

export const useLxpAssignment = (schoolId: string, id: string | null) => {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignment = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAssignmentService(createClient());
      const data = await service.getAssignment(schoolId, id);
      setAssignment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assignment');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchAssignment();
  }, [fetchAssignment]);

  return { assignment, loading, error, refresh: fetchAssignment };
};

export const useLxpAssignmentCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AssignmentCreate): Promise<Assignment | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAssignmentService(createClient());
      const result = await service.createAssignment(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create assignment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpAssignmentUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: AssignmentUpdate): Promise<Assignment | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAssignmentService(createClient());
      const result = await service.updateAssignment(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update assignment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpAssignmentDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAssignmentService(createClient());
      await service.deleteAssignment(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete assignment');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
