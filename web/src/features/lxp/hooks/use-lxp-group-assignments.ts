'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpGroupAssignmentService } from '../services/lxp-group-assignment.service';
import type { GroupAssignment } from '@educi/types';
import type { GroupAssignmentQuery } from '../types';

export const useLxpGroupAssignments = (assignmentId: string) => {
  const [assignments, setAssignments] = useState<readonly GroupAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpGroupAssignmentService(createClient());
      const data = await service.listGroupAssignments(assignmentId);
      setAssignments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch group assignments');
    } finally {
      setLoading(false);
    }
  }, [assignmentId]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return { assignments, loading, error, refresh: fetchAssignments };
};

export const useLxpGroupAssignment = (schoolId: string, id: string | null) => {
  const [assignment, setAssignment] = useState<GroupAssignment | null>(null);
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
      const service = new LxpGroupAssignmentService(createClient());
      const data = await service.getGroupAssignment(schoolId, id);
      setAssignment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch group assignment');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchAssignment();
  }, [fetchAssignment]);

  return { assignment, loading, error, refresh: fetchAssignment };
};

export const useLxpGroupAssignmentCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<GroupAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<GroupAssignment | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpGroupAssignmentService(createClient());
      const result = await service.createGroupAssignment(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create group assignment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpGroupAssignmentUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<GroupAssignment>): Promise<GroupAssignment | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpGroupAssignmentService(createClient());
      const result = await service.updateGroupAssignment(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update group assignment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpGroupAssignmentDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpGroupAssignmentService(createClient());
      await service.deleteGroupAssignment(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete group assignment');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
