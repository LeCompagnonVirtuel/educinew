import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusStudentAssignment, BusStudentAssignmentCreate } from '@educi/types';
import { ScAssignmentNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusAssignmentService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAssignment(schoolId: string, id: string): Promise<BusStudentAssignment> {
    const assignment = await this.repo.findBusAssignmentById(schoolId, id);
    if (!assignment) throw new ScAssignmentNotFoundError(id);
    return assignment;
  }

  async listAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<BusStudentAssignment[]> {
    return this.repo.findAllBusAssignments(schoolId, filters);
  }

  async createAssignment(schoolId: string, data: BusStudentAssignmentCreate): Promise<BusStudentAssignment> {
    return this.repo.createBusAssignment(schoolId, data);
  }

  async updateAssignment(schoolId: string, id: string, data: Partial<BusStudentAssignmentCreate>): Promise<BusStudentAssignment> {
    const existing = await this.repo.findBusAssignmentById(schoolId, id);
    if (!existing) throw new ScAssignmentNotFoundError(id);
    return this.repo.updateBusAssignment(schoolId, id, data);
  }

  async deleteAssignment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusAssignmentById(schoolId, id);
    if (!existing) throw new ScAssignmentNotFoundError(id);
    return this.repo.deleteBusAssignment(schoolId, id);
  }

  async countAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBusAssignments(schoolId, filters);
  }
}
