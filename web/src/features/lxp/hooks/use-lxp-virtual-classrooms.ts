'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpVirtualClassroomService } from '../services/lxp-virtual-classroom.service';
import type { VirtualClassroom } from '@educi/types';
import type { VirtualClassroomQuery } from '../types';

export const useLxpVirtualClassrooms = (courseId: string) => {
  const [classrooms, setClassrooms] = useState<readonly VirtualClassroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClassrooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVirtualClassroomService(createClient());
      const data = await service.listVirtualClassrooms(courseId);
      setClassrooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch virtual classrooms');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchClassrooms();
  }, [fetchClassrooms]);

  return { classrooms, loading, error, refresh: fetchClassrooms };
};

export const useLxpVirtualClassroom = (schoolId: string, id: string | null) => {
  const [classroom, setClassroom] = useState<VirtualClassroom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClassroom = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVirtualClassroomService(createClient());
      const data = await service.getVirtualClassroom(schoolId, id);
      setClassroom(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch virtual classroom');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchClassroom();
  }, [fetchClassroom]);

  return { classroom, loading, error, refresh: fetchClassroom };
};

export const useLxpVirtualClassroomCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<VirtualClassroom, 'id' | 'createdAt' | 'updatedAt' | 'scheduledSessions'>): Promise<VirtualClassroom | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVirtualClassroomService(createClient());
      const result = await service.createVirtualClassroom(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create virtual classroom');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpVirtualClassroomUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<VirtualClassroom>): Promise<VirtualClassroom | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVirtualClassroomService(createClient());
      const result = await service.updateVirtualClassroom(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update virtual classroom');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpVirtualClassroomDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVirtualClassroomService(createClient());
      await service.deleteVirtualClassroom(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete virtual classroom');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
