'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpUnitService } from '../services/lxp-unit.service';
import type { Unit, UnitCreate } from '@educi/types';
import type { UnitUpdate } from '../types';

export const useLxpUnits = (chapterId: string) => {
  const [units, setUnits] = useState<readonly Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUnits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpUnitService(createClient());
      const data = await service.listUnits(chapterId);
      setUnits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch units');
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  return { units, loading, error, refresh: fetchUnits };
};

export const useLxpUnit = (schoolId: string, id: string | null) => {
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUnit = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpUnitService(createClient());
      const data = await service.getUnit(schoolId, id);
      setUnit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch unit');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchUnit();
  }, [fetchUnit]);

  return { unit, loading, error, refresh: fetchUnit };
};

export const useLxpUnitCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: UnitCreate): Promise<Unit | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpUnitService(createClient());
      const result = await service.createUnit(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create unit');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpUnitUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: UnitUpdate): Promise<Unit | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpUnitService(createClient());
      const result = await service.updateUnit(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update unit');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpUnitDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpUnitService(createClient());
      await service.deleteUnit(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete unit');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
