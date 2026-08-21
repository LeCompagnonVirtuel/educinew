'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScBusMaintenanceService } from '../services/sc-bus-maintenance.service';
import { createClient } from '@/lib/supabase/client';
import type { MaintenanceRecord, MaintenanceRecordCreate } from '@educi/types';

export const useScBusMaintenanceList = (schoolId: string) => {
  const [items, setItems] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScBusMaintenanceService(createClient());
      const data = await service.listMaintenance(schoolId);
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

export const useScBusMaintenanceGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<MaintenanceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScBusMaintenanceService(createClient());
      const data = await service.getMaintenance(schoolId, id);
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

export const useScBusMaintenanceCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: MaintenanceRecordCreate): Promise<MaintenanceRecord | null> => {
    try {
      setLoading(true);
      const service = new ScBusMaintenanceService(createClient());
      const result = await service.createMaintenance(schoolId, data);
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

export const useScBusMaintenanceUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<MaintenanceRecordCreate>): Promise<MaintenanceRecord | null> => {
    try {
      setLoading(true);
      const service = new ScBusMaintenanceService(createClient());
      const result = await service.updateMaintenance(schoolId, id, data);
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

export const useScBusMaintenanceDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScBusMaintenanceService(createClient());
      await service.deleteMaintenance(schoolId, id);
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
