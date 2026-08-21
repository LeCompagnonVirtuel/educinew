'use client';
import { useState, useCallback } from 'react';
import { ScEnergyMonitorService } from '../services/sc-energy-monitor.service';
import { ScOccupancyService } from '../services/sc-occupancy.service';
import { ScMaintenanceTicketService } from '../services/sc-maintenance-ticket.service';
import { createClient } from '@/lib/supabase/client';

interface DashboardMetric {
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'stable';
}

export const useScDashboardAnalytics = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOverview = useCallback(async (): Promise<DashboardMetric[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const energyService = new ScEnergyMonitorService(supabase);
      const occupancyService = new ScOccupancyService(supabase);
      const ticketService = new ScMaintenanceTicketService(supabase);

      const [energyMonitors, occupancies, tickets] = await Promise.all([
        energyService.listMonitors(schoolId),
        occupancyService.listOccupancies(schoolId),
        ticketService.listTickets(schoolId),
      ]);

      return [
        { label: 'Energy Monitors', value: energyMonitors.length },
        { label: 'Occupancy Records', value: occupancies.length },
        { label: 'Open Tickets', value: tickets.filter((t) => t.status === 'open').length },
        { label: 'Total Tickets', value: tickets.length },
      ];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getCharts = useCallback(async (chartType: string): Promise<Record<string, unknown>[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const service = new ScEnergyMonitorService(supabase);
      const data = await service.listMonitors(schoolId, { chartType });
      return data as unknown as Record<string, unknown>[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getMetrics = useCallback(async (): Promise<DashboardMetric[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const energyService = new ScEnergyMonitorService(supabase);
      const monitors = await energyService.listMonitors(schoolId);

      return monitors.map((m) => ({
        label: m.name ?? 'Monitor',
        value: m.consumption ?? 0,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getOverview, getCharts, getMetrics };
};
