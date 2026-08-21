'use client';

import { useState, useEffect, useCallback } from 'react';
import type { EncryptionConfig, KeyManagement, FieldEncryption, Certificate } from '@educi/types';

export function useEncryptionConfig(schoolId: string) {
  const [data, setData] = useState<EncryptionConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/encryption/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch encryption config');
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

export function useKeyManagement(schoolId: string) {
  const [data, setData] = useState<KeyManagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKeys = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/encryption/keys?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch key management');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchKeys(); }, [fetchKeys]);

  return { data, loading, error, refetch: fetchKeys };
}

export function useFieldEncryption(schoolId: string) {
  const [data, setData] = useState<FieldEncryption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFields = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/encryption/fields?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch field encryption');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchFields(); }, [fetchFields]);

  return { data, loading, error, refetch: fetchFields };
}

export function useCertificate(schoolId: string) {
  const [data, setData] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/encryption/certificates?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch certificates');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchCertificates(); }, [fetchCertificates]);

  return { data, loading, error, refetch: fetchCertificates };
}
