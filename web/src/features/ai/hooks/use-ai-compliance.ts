'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ComplianceCheck, ConsentManagementCompliance, DataProtection, BreachNotification, Pia } from '@educi/types';

export function useComplianceCheck(schoolId: string) {
  const [data, setData] = useState<ComplianceCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChecks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/compliance/checks?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch compliance checks');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchChecks(); }, [fetchChecks]);

  return { data, loading, error, refetch: fetchChecks };
}

export function useConsentManagementCompliance(schoolId: string) {
  const [data, setData] = useState<ConsentManagementCompliance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/compliance/consent?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch consent management');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchConsent(); }, [fetchConsent]);

  return { data, loading, error, refetch: fetchConsent };
}

export function useDataProtection(schoolId: string) {
  const [data, setData] = useState<DataProtection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProtection = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/compliance/data-protection?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch data protection');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchProtection(); }, [fetchProtection]);

  return { data, loading, error, refetch: fetchProtection };
}

export function useBreachNotification(schoolId: string) {
  const [data, setData] = useState<BreachNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/compliance/breach-notifications?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch breach notifications');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  return { data, loading, error, refetch: fetchNotifications };
}

export function usePia(schoolId: string) {
  const [data, setData] = useState<Pia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPias = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/compliance/pia?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch PIAs');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchPias(); }, [fetchPias]);

  return { data, loading, error, refetch: fetchPias };
}
