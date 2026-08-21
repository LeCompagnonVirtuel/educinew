'use client';

import { useState, useEffect, useCallback } from 'react';
import type { StorageConfig, FileUpload, FileShare, Quota, StorageBackup } from '@educi/types';

export function useStorageConfig(schoolId: string) {
  const [data, setData] = useState<StorageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/storage/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch storage config');
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

export function useFileUpload(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FileUpload | null>(null);

  const uploadFile = useCallback(async (file: File, metadata: Record<string, string>) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify(metadata));
      formData.append('schoolId', schoolId);
      const res = await fetch('/api/ai/storage/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to upload file');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { uploadFile, data, loading, error };
}

export function useFileShare(fileId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareFile = useCallback(async (payload: { userId: string; permission: string; expiresAt?: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/storage/share?fileId=${fileId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to share file');
      const json = await res.json();
      return json.data as FileShare;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fileId]);

  return { shareFile, loading, error };
}

export function useQuota(schoolId: string) {
  const [data, setData] = useState<Quota | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuota = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/storage/quota?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch quota');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchQuota(); }, [fetchQuota]);

  return { data, loading, error, refetch: fetchQuota };
}

export function useStorageBackup(schoolId: string) {
  const [data, setData] = useState<StorageBackup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBackups = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/storage/backups?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch storage backups');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchBackups(); }, [fetchBackups]);

  return { data, loading, error, refetch: fetchBackups };
}
