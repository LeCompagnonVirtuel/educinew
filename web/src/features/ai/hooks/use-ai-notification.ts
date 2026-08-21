'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiNotification, NotificationBatch, NotificationTemplate, NotificationPreference, NotificationDigest, NotificationHistory, NotificationTest, NotificationAnalytics } from '@educi/types';

export function useAiNotification(userId: string) {
  const [data, setData] = useState<AiNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/notifications?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch notifications');
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

export function useNotificationBatch(schoolId: string) {
  const [data, setData] = useState<NotificationBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBatches = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/notifications/batches?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch notification batches');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchBatches(); }, [fetchBatches]);

  return { data, loading, error, refetch: fetchBatches };
}

export function useNotificationTemplate(schoolId: string) {
  const [data, setData] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/notifications/templates?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch notification templates');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  return { data, loading, error, refetch: fetchTemplates };
}

export function useNotificationPreference(userId: string) {
  const [data, setData] = useState<NotificationPreference | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreference = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/notifications/preferences?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch notification preferences');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchPreference(); }, [fetchPreference]);

  return { data, loading, error, refetch: fetchPreference };
}

export function useNotificationDigest(userId: string) {
  const [data, setData] = useState<NotificationDigest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDigests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/notifications/digests?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch notification digests');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchDigests(); }, [fetchDigests]);

  return { data, loading, error, refetch: fetchDigests };
}

export function useNotificationHistory(userId: string) {
  const [data, setData] = useState<NotificationHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/notifications/history?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch notification history');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  return { data, loading, error, refetch: fetchHistory };
}

export function useNotificationTest(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendTest = useCallback(async (payload: { templateId: string; recipientId: string; channel: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/notifications/test?schoolId=${schoolId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to send test notification');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { sendTest, loading, error };
}

export function useNotificationAnalytics(schoolId: string) {
  const [data, setData] = useState<NotificationAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/notifications/analytics?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch notification analytics');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}
