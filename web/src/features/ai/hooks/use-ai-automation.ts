'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Automation, Trigger, ScheduledExecution, EventListener, Webhook, WorkflowTemplate } from '@educi/types';

export function useAutomation(schoolId: string) {
  const [data, setData] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAutomations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/automation?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch automations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAutomations(); }, [fetchAutomations]);

  return { data, loading, error, refetch: fetchAutomations };
}

export function useTrigger(schoolId: string) {
  const [data, setData] = useState<Trigger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTriggers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/automation/triggers?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch triggers');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchTriggers(); }, [fetchTriggers]);

  return { data, loading, error, refetch: fetchTriggers };
}

export function useScheduledExecution(schoolId: string) {
  const [data, setData] = useState<ScheduledExecution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExecutions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/automation/scheduled?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch scheduled executions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchExecutions(); }, [fetchExecutions]);

  return { data, loading, error, refetch: fetchExecutions };
}

export function useEventListener(schoolId: string) {
  const [data, setData] = useState<EventListener[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListeners = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/automation/listeners?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch event listeners');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchListeners(); }, [fetchListeners]);

  return { data, loading, error, refetch: fetchListeners };
}

export function useWebhook(schoolId: string) {
  const [data, setData] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebhooks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/automation/webhooks?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch webhooks');
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

export function useWorkflowTemplate(schoolId: string) {
  const [data, setData] = useState<WorkflowTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/automation/templates?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch workflow templates');
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
