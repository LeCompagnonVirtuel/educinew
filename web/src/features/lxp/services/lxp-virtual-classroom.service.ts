import type { SupabaseClient } from '@supabase/supabase-js';
import type { VirtualClassroom } from '@educi/types';
import { LxpLiveSessionNotFoundError, LxpWhiteboardNotFoundError, LxpBreakoutRoomNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpVirtualClassroomService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getVirtualClassroom(schoolId: string, id: string): Promise<VirtualClassroom> {
    const classroom = await this.repo.findVirtualClassroomById(schoolId, id);
    if (!classroom) throw new LxpLiveSessionNotFoundError(id);
    return classroom;
  }

  async listVirtualClassrooms(courseId: string): Promise<readonly VirtualClassroom[]> {
    return this.repo.findVirtualClassrooms(courseId);
  }

  async createVirtualClassroom(data: Omit<VirtualClassroom, 'id' | 'createdAt' | 'updatedAt' | 'scheduledSessions'>): Promise<VirtualClassroom> {
    const created = await this.repo.createVirtualClassroom(data);
    if (!created) throw new LxpWhiteboardNotFoundError();
    return created;
  }

  async updateVirtualClassroom(schoolId: string, id: string, data: Partial<VirtualClassroom>): Promise<VirtualClassroom> {
    const existing = await this.repo.findVirtualClassroomById(schoolId, id);
    if (!existing) throw new LxpLiveSessionNotFoundError(id);
    const updated = await this.repo.updateVirtualClassroom(id, data);
    if (!updated) throw new LxpWhiteboardNotFoundError();
    return updated;
  }

  async deleteVirtualClassroom(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVirtualClassroomById(schoolId, id);
    if (!existing) throw new LxpLiveSessionNotFoundError(id);
    await this.repo.deleteVirtualClassroom(id);
  }
}
