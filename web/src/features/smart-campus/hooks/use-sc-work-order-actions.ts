'use client';
import { useState, useCallback } from 'react';
import { ScWorkOrderService } from '../services/sc-work-order.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkOrder, WorkOrderCreate } from '@educi/types';

export const useScWorkOrderActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: WorkOrderCreate): Promise<WorkOrder | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWorkOrderService(createClient());
      return await service.createWorkOrder(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const start = useCallback(async (workOrderId: string): Promise<WorkOrder | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWorkOrderService(createClient());
      return await service.updateWorkOrder(schoolId, workOrderId, { status: 'in_progress' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const complete = useCallback(async (workOrderId: string): Promise<WorkOrder | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWorkOrderService(createClient());
      return await service.updateWorkOrder(schoolId, workOrderId, { status: 'completed' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const cancel = useCallback(async (workOrderId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWorkOrderService(createClient());
      await service.deleteWorkOrder(schoolId, workOrderId);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, start, complete, cancel };
};
