'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Integration, WebhookIntegration, ApiKeyIntegration, OAuth2Integration, VersioningIntegration } from '@educi/types';

export function useIntegration(schoolId: string) {
  const [data, setData] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIntegrations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/integration?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch integrations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchIntegrations(); }, [fetchIntegrations]);

  return { data, loading, error, refetch: fetchIntegrations };
}

export function useWebhookIntegration(schoolId: string) {
  const [data, setData] = useState<WebhookIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebhooks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/integration/webhooks?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch webhook integrations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchWebhooks(); }, [fetchWebhooks]);

  return { data, loading, error, refetch: fetchWebhooks };
}

export function useApiKeyIntegration(schoolId: string) {
  const [data, setData] = useState<ApiKeyIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApiKeys = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/integration/api-keys?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch API key integrations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchApiKeys(); }, [fetchApiKeys]);

  return { data, loading, error, refetch: fetchApiKeys };
}

export function useOAuth2Integration(schoolId: string) {
  const [data, setData] = useState<OAuth2Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOAuth = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/integration/oauth2?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch OAuth2 integrations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchOAuth(); }, [fetchOAuth]);

  return { data, loading, error, refetch: fetchOAuth };
}

export function useVersioningIntegration(schoolId: string) {
  const [data, setData] = useState<VersioningIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVersioning = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/integration/versioning?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch versioning integrations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchVersioning(); }, [fetchVersioning]);

  return { data, loading, error, refetch: fetchVersioning };
}
