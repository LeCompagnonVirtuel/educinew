import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Agent {
  id: string;
  school_id: string;
  agent_code: string;
  name: string;
  description: string;
  type: 'financial' | 'compliance' | 'analytics' | 'notification' | 'automation' | 'custom';
  capabilities: string[];
  configuration: Record<string, unknown>;
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  last_active_at?: string;
  total_tasks: number;
  success_rate: number;
  average_response_time_ms: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface AgentTask {
  id: string;
  agent_id: string;
  task_type: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  started_at?: string;
  completed_at?: string;
  duration_ms?: number;
  error?: string;
  retry_count: number;
  max_retries: number;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAgent {
  name: string;
  description: string;
  type: 'financial' | 'compliance' | 'analytics' | 'notification' | 'automation' | 'custom';
  capabilities: string[];
  configuration: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateAgent {
  name?: string;
  description?: string;
  capabilities?: string[];
  configuration?: Record<string, unknown>;
  status?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateAgentTask {
  agent_id: string;
  task_type: string;
  input: Record<string, unknown>;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  max_retries?: number;
}

export class AgentOrchestrationService {
  private readonly AGENTS_TABLE = 'agents';
  private readonly TASKS_TABLE = 'agent_tasks';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllAgents(schoolId: string): Promise<Agent[]> {
    const { data, error } = await this.supabase
      .from(this.AGENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getAgentById(schoolId: string, id: string): Promise<Agent | null> {
    const { data, error } = await this.supabase
      .from(this.AGENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createAgent(schoolId: string, agent: CreateAgent): Promise<Agent> {
    const agentCode = `AGT-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.AGENTS_TABLE)
      .insert({
        agent_code: agentCode,
        ...agent,
        status: 'active',
        total_tasks: 0,
        success_rate: 0,
        average_response_time_ms: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateAgent(schoolId: string, id: string, agent: UpdateAgent): Promise<Agent> {
    const { data, error } = await this.supabase
      .from(this.AGENTS_TABLE)
      .update({ ...agent, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteAgent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.AGENTS_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async activateAgent(schoolId: string, id: string): Promise<Agent> {
    return this.updateAgent(schoolId, id, { status: 'active' });
  }

  async deactivateAgent(schoolId: string, id: string): Promise<Agent> {
    return this.updateAgent(schoolId, id, { status: 'inactive' });
  }

  async createTask(schoolId: string, task: CreateAgentTask): Promise<AgentTask> {
    const { data, error } = await this.supabase
      .from(this.TASKS_TABLE)
      .insert({
        ...task,
        priority: task.priority || 'medium',
        max_retries: task.max_retries || 3,
        status: 'pending',
        retry_count: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateTask(schoolId: string, id: string, updates: Partial<AgentTask>): Promise<AgentTask> {
    const { data, error } = await this.supabase
      .from(this.TASKS_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async startTask(schoolId: string, id: string): Promise<AgentTask> {
    return this.updateTask(schoolId, id, {
      status: 'running',
      started_at: new Date().toISOString(),
    });
  }

  async completeTask(schoolId: string, id: string, output: Record<string, unknown>): Promise<AgentTask> {
    const task = await this.getTaskById(schoolId, id);
    if (!task) throw new Error('Task not found');

    const durationMs = task.started_at
      ? Date.now() - new Date(task.started_at).getTime()
      : 0;

    return this.updateTask(schoolId, id, {
      status: 'completed',
      output,
      completed_at: new Date().toISOString(),
      duration_ms: durationMs,
    });
  }

  async failTask(schoolId: string, id: string, error: string): Promise<AgentTask> {
    const task = await this.getTaskById(schoolId, id);
    if (!task) throw new Error('Task not found');

    if (task.retry_count < task.max_retries) {
      return this.updateTask(schoolId, id, {
        status: 'pending',
        retry_count: task.retry_count + 1,
        error,
      });
    }

    return this.updateTask(schoolId, id, {
      status: 'failed',
      error,
      completed_at: new Date().toISOString(),
    });
  }

  async cancelTask(schoolId: string, id: string): Promise<AgentTask> {
    return this.updateTask(schoolId, id, {
      status: 'cancelled',
      completed_at: new Date().toISOString(),
    });
  }

  async getTaskById(schoolId: string, id: string): Promise<AgentTask | null> {
    const { data, error } = await this.supabase
      .from(this.TASKS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getTasksByAgent(schoolId: string, agentId: string): Promise<AgentTask[]> {
    const { data, error } = await this.supabase
      .from(this.TASKS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getPendingTasks(schoolId: string): Promise<AgentTask[]> {
    const { data, error } = await this.supabase
      .from(this.TASKS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending')
      .order('priority', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getActiveAgents(schoolId: string): Promise<Agent[]> {
    const { data, error } = await this.supabase
      .from(this.AGENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getAgentStats(schoolId: string): Promise<{ totalAgents: number; activeAgents: number; totalTasks: number; pendingTasks: number; averageSuccessRate: number }> {
    const agents = await this.getAllAgents(schoolId);
    const tasks = await this.getPendingTasks(schoolId);
    const activeAgents = agents.filter((a) => a.status === 'active');

    return {
      totalAgents: agents.length,
      activeAgents: activeAgents.length,
      totalTasks: agents.reduce((sum, a) => sum + a.total_tasks, 0),
      pendingTasks: tasks.length,
      averageSuccessRate: activeAgents.length > 0
        ? activeAgents.reduce((sum, a) => sum + a.success_rate, 0) / activeAgents.length
        : 0,
    };
  }
}
