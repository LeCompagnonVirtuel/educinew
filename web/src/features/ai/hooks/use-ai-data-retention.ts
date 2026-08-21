'use client';

import { useState, useEffect, useCallback } from 'react';
import type { RetentionPolicy, Deletion, Archival, LegalHold } from '@educi/types';

export function useRetentionPolicy(schoolId: string) {
  const [data, setData] = useState<RetentionPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/data-retention/policies?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch retention policies');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchPolicies(); }, [fetchPolicies]);

  return { data, loading, error, refetch: fetchPolicies };
}

export function useDeletion(schoolId: string) {
  const [data, setData] = useState<Deletion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeletions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/data-retention/deletions?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch deletions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchDeletions(); }, [fetchDeletions]);

  return { data, loading, error, refetch: fetchDeletions };
}

export function useArchival(schoolId: string) {
  const [data, setData] = useState<Archival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArchives = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/data-retention/archives?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch archival');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchArchives(); }, [fetchArchives]);

  return { data, loading, error, refetch: fetchArchives };
}

export function useLegalHold(schoolId: string) {
  const [data, setData] = useState<LegalHold[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHolds = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/data-retention/legal-holds?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch legal holds');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchHolds(); }, [fetchHolds]);

  return { data, loading, error, refetch: fetchHolds };
}
