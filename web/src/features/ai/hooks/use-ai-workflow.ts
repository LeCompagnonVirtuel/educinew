'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Workflow, WorkflowStep, WorkflowExecution, WorkflowRollback, WorkflowVersion, WorkflowTesting, WorkflowDeployment, WorkflowMonitoring } from '@educi/types';

export function useWorkflow(schoolId: string) {
  const [data, setData] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkflows = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/workflow?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch workflows');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchWorkflows(); }, [fetchWorkflows]);

  return { data, loading, error, refetch: fetchWorkflows };
}

export function useWorkflowStep(workflowId: string) {
  const [data, setData] = useState<WorkflowStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSteps = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/workflow/steps?workflowId=${workflowId}`);
      if (!res.ok) throw new Error('Failed to fetch workflow steps');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => { fetchSteps(); }, [fetchSteps]);

  return { data, loading, error, refetch: fetchSteps };
}

export function useWorkflowExecution(workflowId: string) {
  const [data, setData] = useState<WorkflowExecution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExecutions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/workflow/executions?workflowId=${workflowId}`);
      if (!res.ok) throw new Error('Failed to fetch workflow executions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => { fetchExecutions(); }, [fetchExecutions]);

  return { data, loading, error, refetch: fetchExecutions };
}

export function useWorkflowRollback(workflowId: string) {
  const [data, setData] = useState<WorkflowRollback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRollbacks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/workflow/rollbacks?workflowId=${workflowId}`);
      if (!res.ok) throw new Error('Failed to fetch workflow rollbacks');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => { fetchRollbacks(); }, [fetchRollbacks]);

  return { data, loading, error, refetch: fetchRollbacks };
}

export function useWorkflowVersion(workflowId: string) {
  const [data, setData] = useState<WorkflowVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVersions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/workflow/versions?workflowId=${workflowId}`);
      if (!res.ok) throw new Error('Failed to fetch workflow versions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => { fetchVersions(); }, [fetchVersions]);

  return { data, loading, error, refetch: fetchVersions };
}

export function useWorkflowTesting(workflowId: string) {
  const [data, setData] = useState<WorkflowTesting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/workflow/testing?workflowId=${workflowId}`);
      if (!res.ok) throw new Error('Failed to fetch workflow tests');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => { fetchTests(); }, [fetchTests]);

  return { data, loading, error, refetch: fetchTests };
}

export function useWorkflowDeployment(workflowId: string) {
  const [data, setData] = useState<WorkflowDeployment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeployment = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/workflow/deployment?workflowId=${workflowId}`);
      if (!res.ok) throw new Error('Failed to fetch workflow deployment');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => { fetchDeployment(); }, [fetchDeployment]);

  return { data, loading, error, refetch: fetchDeployment };
}

export function useWorkflowMonitoring(workflowId: string) {
  const [data, setData] = useState<WorkflowMonitoring | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonitoring = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/workflow/monitoring?workflowId=${workflowId}`);
      if (!res.ok) throw new Error('Failed to fetch workflow monitoring');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => { fetchMonitoring(); }, [fetchMonitoring]);

  return { data, loading, error, refetch: fetchMonitoring };
}
