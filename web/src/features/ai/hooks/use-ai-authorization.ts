'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Rbac, Permissions, RolePermissionMatrix, Policy, ContextAuth } from '@educi/types';

export function useRbac(schoolId: string) {
  const [data, setData] = useState<Rbac | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRbac = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/authorization/rbac?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch RBAC');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchRbac(); }, [fetchRbac]);

  return { data, loading, error, refetch: fetchRbac };
}

export function usePermissions(schoolId: string) {
  const [data, setData] = useState<Permissions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/authorization/permissions?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch permissions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchPermissions(); }, [fetchPermissions]);

  return { data, loading, error, refetch: fetchPermissions };
}

export function useRolePermissionMatrix(schoolId: string) {
  const [data, setData] = useState<RolePermissionMatrix | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatrix = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/authorization/role-permission-matrix?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch role permission matrix');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchMatrix(); }, [fetchMatrix]);

  return { data, loading, error, refetch: fetchMatrix };
}

export function usePolicy(schoolId: string) {
  const [data, setData] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/authorization/policies?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch policies');
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

export function useContextAuth(userId: string) {
  const [data, setData] = useState<ContextAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContext = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/authorization/context?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch context auth');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchContext(); }, [fetchContext]);

  return { data, loading, error, refetch: fetchContext };
}
