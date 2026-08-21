import type { SupabaseClient } from '@supabase/supabase-js';
import type { TaskDelegation } from '@educi/types';
import { EduOSTaskDelegationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSTaskDelegationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getTaskDelegation(schoolId: string, id: string): Promise<TaskDelegation> {
    const item = await this.repo.getTaskDelegation(schoolId, id);
    if (!item) throw new EduOSTaskDelegationError(id);
    return item;
  }
  async listTaskDelegations(schoolId: string, filters?: Record<string, unknown>): Promise<TaskDelegation[]> {
    return this.repo.listTaskDelegations(schoolId, filters);
  }
  async createTaskDelegation(schoolId: string, data: Partial<TaskDelegation>): Promise<TaskDelegation> {
    return this.repo.createTaskDelegation(schoolId, data as any);
  }
  async updateTaskDelegation(schoolId: string, id: string, data: Partial<TaskDelegation>): Promise<TaskDelegation> {
    const existing = await this.repo.getTaskDelegation(schoolId, id);
    if (!existing) throw new EduOSTaskDelegationError(id);
    return this.repo.updateTaskDelegation(schoolId, id, data as any);
  }
  async deleteTaskDelegation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTaskDelegation(schoolId, id);
    if (!existing) throw new EduOSTaskDelegationError(id);
    return this.repo.deleteTaskDelegation(schoolId, id);
  }
}

