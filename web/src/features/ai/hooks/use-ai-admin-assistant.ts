'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AdminDashboard, AdminReport, FinancialReport, Enrollment, StaffManagement, Inventory, Maintenance, Transport } from '@educi/types';

export function useAdminDashboard(schoolId: string) {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/admin-assistant/dashboard?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch admin dashboard');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  return { data, loading, error, refetch: fetchDashboard };
}

export function useAdminReports(schoolId: string) {
  const [data, setData] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/admin-assistant/reports?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch admin reports');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  return { data, loading, error, refetch: fetchReports };
}

export function useFinancialReport(schoolId: string, period: string) {
  const [data, setData] = useState<FinancialReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/admin-assistant/financial-report?schoolId=${schoolId}&period=${encodeURIComponent(period)}`);
      if (!res.ok) throw new Error('Failed to fetch financial report');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, period]);

  useEffect(() => { fetchReport(); }, [fetchReport]);

  return { data, loading, error, refetch: fetchReport };
}

export function useEnrollment(schoolId: string) {
  const [data, setData] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollment = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/admin-assistant/enrollment?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch enrollment');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchEnrollment(); }, [fetchEnrollment]);

  return { data, loading, error, refetch: fetchEnrollment };
}

export function useStaffManagement(schoolId: string) {
  const [data, setData] = useState<StaffManagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/admin-assistant/staff?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch staff management');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchStaff(); }, [fetchStaff]);

  return { data, loading, error, refetch: fetchStaff };
}

export function useInventory(schoolId: string) {
  const [data, setData] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/admin-assistant/inventory?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch inventory');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchInventory(); }, [fetchInventory]);

  return { data, loading, error, refetch: fetchInventory };
}

export function useMaintenance(schoolId: string) {
  const [data, setData] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMaintenance = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/admin-assistant/maintenance?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch maintenance');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchMaintenance(); }, [fetchMaintenance]);

  return { data, loading, error, refetch: fetchMaintenance };
}

export function useTransport(schoolId: string) {
  const [data, setData] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransport = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/admin-assistant/transport?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch transport');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchTransport(); }, [fetchTransport]);

  return { data, loading, error, refetch: fetchTransport };
}
