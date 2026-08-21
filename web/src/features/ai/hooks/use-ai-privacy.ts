'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DataClassification, PrivacyConfig, DataTransfer, PrivacyByDesign, PrivacyMonitoring } from '@educi/types';

export function useDataClassification(schoolId: string) {
  const [data, setData] = useState<DataClassification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClassifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/privacy/classifications?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch data classifications');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchClassifications(); }, [fetchClassifications]);

  return { data, loading, error, refetch: fetchClassifications };
}

export function usePrivacyConfig(schoolId: string) {
  const [data, setData] = useState<PrivacyConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/privacy/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch privacy config');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  return { data, loading, error, refetch: fetchConfig };
}

export function useDataTransfer(schoolId: string) {
  const [data, setData] = useState<DataTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransfers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/privacy/transfers?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch data transfers');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchTransfers(); }, [fetchTransfers]);

  return { data, loading, error, refetch: fetchTransfers };
}

export function usePrivacyByDesign(schoolId: string) {
  const [data, setData] = useState<PrivacyByDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/privacy/by-design?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch privacy by design');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAssessments(); }, [fetchAssessments]);

  return { data, loading, error, refetch: fetchAssessments };
}

export function usePrivacyMonitoring(schoolId: string) {
  const [data, setData] = useState<PrivacyMonitoring | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonitoring = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/privacy/monitoring?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch privacy monitoring');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchMonitoring(); }, [fetchMonitoring]);

  return { data, loading, error, refetch: fetchMonitoring };
}
