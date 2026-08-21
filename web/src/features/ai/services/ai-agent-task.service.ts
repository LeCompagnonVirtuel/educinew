import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiAgentTask, AiAgentTaskQuery, AiAgentTaskCreate, AiAgentTaskUpdate } from '@educi/types';
import { AiAgentTaskNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiAgentTaskService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getTask(schoolId: string, id: string): Promise<AiAgentTask> {
    const task = await this.repo.findById(schoolId, id);
    if (!task) throw new AiAgentTaskNotFoundError(id);
    return task;
  }

  async listTasks(schoolId: string, query: AiAgentTaskQuery): Promise<AiAgentTask[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createTask(schoolId: string, data: AiAgentTaskCreate): Promise<AiAgentTask> {
    return this.repo.create(schoolId, data);
  }

  async updateTask(schoolId: string, id: string, data: AiAgentTaskUpdate): Promise<AiAgentTask> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAgentTaskNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteTask(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAgentTaskNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getTasksByAgent(schoolId: string, agentId: string): Promise<AiAgentTask[]> {
    return this.repo.findTasksByAgentId(schoolId, agentId);
  }
}
