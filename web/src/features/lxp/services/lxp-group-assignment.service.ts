import type { SupabaseClient } from '@supabase/supabase-js';
import type { GroupAssignment } from '@educi/types';
import { LxpGroupAssignmentNotFoundError, LxpGroupAssignmentCreateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpGroupAssignmentService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getGroupAssignment(schoolId: string, id: string): Promise<GroupAssignment> {
    const assignment = await this.repo.findGroupAssignmentById(schoolId, id);
    if (!assignment) throw new LxpGroupAssignmentNotFoundError(id);
    return assignment;
  }

  async listGroupAssignments(assignmentId: string): Promise<readonly GroupAssignment[]> {
    return this.repo.findGroupAssignments(assignmentId);
  }

  async createGroupAssignment(data: Omit<GroupAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<GroupAssignment> {
    const created = await this.repo.createGroupAssignment(data);
    if (!created) throw new LxpGroupAssignmentCreateError();
    return created;
  }

  async updateGroupAssignment(schoolId: string, id: string, data: Partial<GroupAssignment>): Promise<GroupAssignment> {
    const existing = await this.repo.findGroupAssignmentById(schoolId, id);
    if (!existing) throw new LxpGroupAssignmentNotFoundError(id);
    const updated = await this.repo.updateGroupAssignment(id, data);
    if (!updated) throw new LxpGroupAssignmentNotFoundError();
    return updated;
  }

  async deleteGroupAssignment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGroupAssignmentById(schoolId, id);
    if (!existing) throw new LxpGroupAssignmentNotFoundError(id);
    await this.repo.deleteGroupAssignment(id);
  }
}
