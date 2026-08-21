'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiPreference } from '@educi/types';

export function useAiPreferences(userId: string) {
  const [data, setData] = useState<AiPreference | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreferences = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/preferences?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch preferences');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchPreferences(); }, [fetchPreferences]);

  return { data, loading, error, refetch: fetchPreferences };
}

export function useUpdatePreferences(userId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePreferences = useCallback(async (payload: Partial<AiPreference>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/preferences?userId=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update preferences');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { updatePreferences, loading, error };
}

export function useTheme(userId: string) {
  const [data, setData] = useState<string>('light');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTheme = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/preferences/theme?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch theme');
      const json = await res.json();
      setData(json.data.theme);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchTheme(); }, [fetchTheme]);

  return { data, loading, error, refetch: fetchTheme };
}

export function useLanguage(userId: string) {
  const [data, setData] = useState<string>('en');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLanguage = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/preferences/language?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch language');
      const json = await res.json();
      setData(json.data.language);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchLanguage(); }, [fetchLanguage]);

  return { data, loading, error, refetch: fetchLanguage };
}

export function useNotifications(userId: string) {
  const [data, setData] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/preferences/notifications?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch notification preferences');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  return { data, loading, error, refetch: fetchNotifications };
}
