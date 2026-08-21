import type { SupabaseClient } from '@supabase/supabase-js';
import type { AgentTask } from '@educi/types';
import { AEIPMultiAgentTaskError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPMultiAgentTaskService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getTask(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listTasks(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createTask(schoolId: string, data: Partial<AgentTask>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateTask(schoolId: string, id: string, data: Partial<AgentTask>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteTask(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}