'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScWorkOrderService } from '../services/sc-work-order.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkOrder } from '@educi/types';

export const useScWorkOrderList = (schoolId: string) => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkOrders = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScWorkOrderService(createClient());
      const data = await service.listWorkOrders(schoolId);
      setWorkOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchWorkOrders();
  }, [fetchWorkOrders]);

  return { workOrders, loading, error, refresh: fetchWorkOrders };
};
