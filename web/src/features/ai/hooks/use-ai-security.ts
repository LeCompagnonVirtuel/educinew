'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Authentication, Authorization, Csrf, PasswordPolicy, TwoFactor } from '@educi/types';

export function useAuthentication(schoolId: string) {
  const [data, setData] = useState<Authentication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuth = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/security/authentication?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch authentication');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAuth(); }, [fetchAuth]);

  return { data, loading, error, refetch: fetchAuth };
}

export function useAuthorization(schoolId: string) {
  const [data, setData] = useState<Authorization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthz = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/security/authorization?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch authorization');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAuthz(); }, [fetchAuthz]);

  return { data, loading, error, refetch: fetchAuthz };
}

export function useCsrf(schoolId: string) {
  const [data, setData] = useState<Csrf | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCsrf = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/security/csrf?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch CSRF token');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchCsrf(); }, [fetchCsrf]);

  return { data, loading, error, refetch: fetchCsrf };
}

export function usePasswordPolicy(schoolId: string) {
  const [data, setData] = useState<PasswordPolicy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicy = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/security/password-policy?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch password policy');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchPolicy(); }, [fetchPolicy]);

  return { data, loading, error, refetch: fetchPolicy };
}

export function useTwoFactor(userId: string) {
  const [data, setData] = useState<TwoFactor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTwoFactor = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/security/two-factor?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch two-factor auth');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchTwoFactor(); }, [fetchTwoFactor]);

  return { data, loading, error, refetch: fetchTwoFactor };
}
