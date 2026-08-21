'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScRoomAssignmentService } from '../services/sc-room-assignment.service';
import { createClient } from '@/lib/supabase/client';
import type { RoomAssignment, RoomAssignmentCreate } from '@educi/types';

export const useScRoomAssignmentList = (schoolId: string) => {
  const [items, setItems] = useState<RoomAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScRoomAssignmentService(createClient());
      const data = await service.listAssignments(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { items, loading, error, refresh: fetchData };
};

export const useScRoomAssignmentGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<RoomAssignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScRoomAssignmentService(createClient());
      const data = await service.getAssignment(schoolId, id);
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);
  useEffect(() => { fetchItem(); }, [fetchItem]);
  return { item, loading, error, refresh: fetchItem };
};

export const useScRoomAssignmentCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: RoomAssignmentCreate): Promise<RoomAssignment | null> => {
    try {
      setLoading(true);
      const service = new ScRoomAssignmentService(createClient());
      const result = await service.createAssignment(schoolId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { create, loading, error };
};

export const useScRoomAssignmentUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<RoomAssignmentCreate>): Promise<RoomAssignment | null> => {
    try {
      setLoading(true);
      const service = new ScRoomAssignmentService(createClient());
      const result = await service.updateAssignment(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { update, loading, error };
};

export const useScRoomAssignmentDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScRoomAssignmentService(createClient());
      await service.deleteAssignment(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { remove, loading, error };
};
