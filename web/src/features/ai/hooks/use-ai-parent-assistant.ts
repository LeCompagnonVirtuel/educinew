'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ParentAssistant, ParentNotification, MeetingRequest, Homework, StudyTime, ProgressVisualization, BehaviorReport } from '@educi/types';

export function useParentAssistant(parentId: string) {
  const [data, setData] = useState<ParentAssistant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssistant = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/parent-assistant?parentId=${parentId}`);
      if (!res.ok) throw new Error('Failed to fetch parent assistant');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => { fetchAssistant(); }, [fetchAssistant]);

  return { data, loading, error, refetch: fetchAssistant };
}

export function useParentNotifications(parentId: string) {
  const [data, setData] = useState<ParentNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/parent-assistant/notifications?parentId=${parentId}`);
      if (!res.ok) throw new Error('Failed to fetch parent notifications');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  return { data, loading, error, refetch: fetchNotifications };
}

export function useMeetingRequest(parentId: string) {
  const [data, setData] = useState<MeetingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetingRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/parent-assistant/meeting-requests?parentId=${parentId}`);
      if (!res.ok) throw new Error('Failed to fetch meeting requests');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => { fetchMeetingRequests(); }, [fetchMeetingRequests]);

  return { data, loading, error, refetch: fetchMeetingRequests };
}

export function useHomework(parentId: string, studentId: string) {
  const [data, setData] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHomework = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/parent-assistant/homework?parentId=${parentId}&studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch homework');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [parentId, studentId]);

  useEffect(() => { fetchHomework(); }, [fetchHomework]);

  return { data, loading, error, refetch: fetchHomework };
}

export function useStudyTime(parentId: string, studentId: string) {
  const [data, setData] = useState<StudyTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudyTime = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/parent-assistant/study-time?parentId=${parentId}&studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch study time');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [parentId, studentId]);

  useEffect(() => { fetchStudyTime(); }, [fetchStudyTime]);

  return { data, loading, error, refetch: fetchStudyTime };
}

export function useProgressVisualization(parentId: string, studentId: string) {
  const [data, setData] = useState<ProgressVisualization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVisualization = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/parent-assistant/progress-visualization?parentId=${parentId}&studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch progress visualization');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [parentId, studentId]);

  useEffect(() => { fetchVisualization(); }, [fetchVisualization]);

  return { data, loading, error, refetch: fetchVisualization };
}

export function useBehaviorReport(parentId: string, studentId: string) {
  const [data, setData] = useState<BehaviorReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBehaviorReport = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/parent-assistant/behavior-report?parentId=${parentId}&studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch behavior report');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [parentId, studentId]);

  useEffect(() => { fetchBehaviorReport(); }, [fetchBehaviorReport]);

  return { data, loading, error, refetch: fetchBehaviorReport };
}

export function useEvents(parentId: string) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/parent-assistant/events?parentId=${parentId}`);
      if (!res.ok) throw new Error('Failed to fetch events');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  return { data, loading, error, refetch: fetchEvents };
}
