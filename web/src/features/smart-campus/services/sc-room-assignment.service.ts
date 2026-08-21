import type { SupabaseClient } from '@supabase/supabase-js';
import type { RoomAssignment, RoomAssignmentCreate } from '@educi/types';
import { ScRoomAssignmentNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScRoomAssignmentService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAssignment(schoolId: string, id: string): Promise<RoomAssignment> {
    const assignment = await this.repo.findRoomAssignmentById(schoolId, id);
    if (!assignment) throw new ScRoomAssignmentNotFoundError(id);
    return assignment;
  }

  async listAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<RoomAssignment[]> {
    return this.repo.findAllRoomAssignments(schoolId, filters);
  }

  async createAssignment(schoolId: string, data: RoomAssignmentCreate): Promise<RoomAssignment> {
    return this.repo.createRoomAssignment(schoolId, data);
  }

  async updateAssignment(schoolId: string, id: string, data: Partial<RoomAssignmentCreate>): Promise<RoomAssignment> {
    const existing = await this.repo.findRoomAssignmentById(schoolId, id);
    if (!existing) throw new ScRoomAssignmentNotFoundError(id);
    return this.repo.updateRoomAssignment(schoolId, id, data);
  }

  async deleteAssignment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRoomAssignmentById(schoolId, id);
    if (!existing) throw new ScRoomAssignmentNotFoundError(id);
    return this.repo.deleteRoomAssignment(schoolId, id);
  }

  async countAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRoomAssignments(schoolId, filters);
  }
}
