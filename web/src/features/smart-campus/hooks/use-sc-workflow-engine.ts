'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  assignee?: string;
}

interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  currentStep: number;
  status: 'running' | 'completed' | 'paused';
}

interface WorkflowConfig {
  name: string;
  steps: Omit<WorkflowStep, 'id' | 'status'>[];
}

export const useScWorkflowEngine = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async (config: WorkflowConfig): Promise<Workflow | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const steps = config.steps.map((s, i) => ({
        ...s,
        id: `step_${i}`,
        status: i === 0 ? 'active' : 'pending',
      }));

      const { data, error: insertError } = await supabase
        .from('sc_workflows')
        .insert({
          school_id: schoolId,
          name: config.name,
          steps,
          current_step: 0,
          status: 'running',
        })
        .select()
        .single();

      if (insertError) throw insertError;
      return data as Workflow;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const advance = useCallback(async (workflowId: string): Promise<Workflow | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data: existing, error: fetchError } = await supabase
        .from('sc_workflows')
        .select('*')
        .eq('id', workflowId)
        .single();

      if (fetchError) throw fetchError;

      const workflow = existing as Workflow;
      const nextStep = workflow.currentStep + 1;
      if (nextStep >= workflow.steps.length) {
        await supabase
          .from('sc_workflows')
          .update({ status: 'completed' })
          .eq('id', workflowId);
        return { ...workflow, status: 'completed' };
      }

      const updatedSteps = workflow.steps.map((s, i) => ({
        ...s,
        status: i < nextStep ? 'completed' : i === nextStep ? 'active' : 'pending',
      }));

      const { data, error: updateError } = await supabase
        .from('sc_workflows')
        .update({ steps: updatedSteps, current_step: nextStep })
        .eq('id', workflowId)
        .select()
        .single();

      if (updateError) throw updateError;
      return data as Workflow;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProgress = useCallback(async (workflowId: string): Promise<Workflow | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_workflows')
        .select('*')
        .eq('id', workflowId)
        .single();

      if (queryError) throw queryError;
      return data as Workflow;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, start, advance, getProgress };
};
