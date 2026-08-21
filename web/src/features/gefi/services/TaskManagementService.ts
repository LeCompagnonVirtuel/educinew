import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Task {
  id: string;
  school_id: string;
  task_code: string;
  title: string;
  description: string;
  type: 'financial' | 'compliance' | 'reporting' | 'maintenance' | 'custom';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  assigned_to?: string;
  assigned_by?: string;
  due_date?: string;
  started_at?: string;
  completed_at?: string;
  estimated_hours?: number;
  actual_hours?: number;
  tags: string[];
  dependencies: string[];
  subtasks: Subtask[];
  attachments: string[];
  comments: TaskComment[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  completed_at?: string;
}

export interface TaskComment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface CreateTask {
  title: string;
  description: string;
  type: 'financial' | 'compliance' | 'reporting' | 'maintenance' | 'custom';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  assigned_by?: string;
  due_date?: string;
  estimated_hours?: number;
  tags?: string[];
  dependencies?: string[];
  subtasks?: Omit<Subtask, 'id' | 'completed' | 'completed_at'>[];
  metadata?: Record<string, unknown>;
}

export interface UpdateTask {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  assigned_to?: string;
  due_date?: string;
  started_at?: string;
  completed_at?: string;
  estimated_hours?: number;
  actual_hours?: number;
  tags?: string[];
  dependencies?: string[];
  subtasks?: Subtask[];
  metadata?: Record<string, unknown>;
}

export class TaskManagementService {
  private readonly TABLE = 'tasks';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Task[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Task | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, task: CreateTask): Promise<Task> {
    const taskCode = `TASK-${Date.now()}`;
    const subtasks = (task.subtasks || []).map((st, index) => ({
      ...st,
      id: `ST-${Date.now()}-${index}`,
      completed: false,
    }));

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        task_code: taskCode,
        ...task,
        tags: task.tags || [],
        dependencies: task.dependencies || [],
        subtasks,
        attachments: [],
        comments: [],
        status: 'todo',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, task: UpdateTask): Promise<Task> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...task, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async start(schoolId: string, id: string): Promise<Task> {
    return this.update(schoolId, id, {
      status: 'in_progress',
      started_at: new Date().toISOString(),
    });
  }

  async complete(schoolId: string, id: string): Promise<Task> {
    return this.update(schoolId, id, {
      status: 'completed',
      completed_at: new Date().toISOString(),
    });
  }

  async cancel(schoolId: string, id: string): Promise<Task> {
    return this.update(schoolId, id, { status: 'cancelled' });
  }

  async assign(schoolId: string, id: string, assignedTo: string): Promise<Task> {
    return this.update(schoolId, id, { assigned_to: assignedTo });
  }

  async addComment(schoolId: string, id: string, userId: string, content: string): Promise<Task> {
    const task = await this.getById(schoolId, id);
    if (!task) throw new Error('Task not found');

    const newComment: TaskComment = {
      id: `CMT-${Date.now()}`,
      user_id: userId,
      content,
      created_at: new Date().toISOString(),
    };

    return this.update(schoolId, id, {
      comments: [...task.comments, newComment],
    });
  }

  async completeSubtask(schoolId: string, taskId: string, subtaskId: string): Promise<Task> {
    const task = await this.getById(schoolId, taskId);
    if (!task) throw new Error('Task not found');

    const updatedSubtasks = task.subtasks.map((st) =>
      st.id === subtaskId
        ? { ...st, completed: true, completed_at: new Date().toISOString() }
        : st
    );

    return this.update(schoolId, taskId, { subtasks: updatedSubtasks });
  }

  async getByStatus(schoolId: string, status: string): Promise<Task[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getTodo(schoolId: string): Promise<Task[]> {
    return this.getByStatus(schoolId, 'todo');
  }

  async getInProgress(schoolId: string): Promise<Task[]> {
    return this.getByStatus(schoolId, 'in_progress');
  }

  async getOverdue(schoolId: string): Promise<Task[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('status', ['todo', 'in_progress'])
      .lt('due_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByAssignee(schoolId: string, assignee: string): Promise<Task[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('assigned_to', assignee)
      .is('deleted_at', null)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, type: string): Promise<Task[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{ total: number; todo: number; inProgress: number; completed: number; overdue: number }> {
    const tasks = await this.getAll(schoolId);
    const overdue = await this.getOverdue(schoolId);
    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === 'todo').length,
      inProgress: tasks.filter((t) => t.status === 'in_progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      overdue: overdue.length,
    };
  }
}
