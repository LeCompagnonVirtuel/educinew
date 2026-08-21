import type { SupabaseClient } from '@supabase/supabase-js';
import type { RoomScheduling, RoomSchedulingCreate } from '@educi/types';
import { ScRoomSchedulingNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScRoomSchedulingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getScheduling(schoolId: string, id: string): Promise<RoomScheduling> {
    const scheduling = await this.repo.findRoomSchedulingById(schoolId, id);
    if (!scheduling) throw new ScRoomSchedulingNotFoundError(id);
    return scheduling;
  }

  async listSchedulings(schoolId: string, filters?: Record<string, unknown>): Promise<RoomScheduling[]> {
    return this.repo.findAllRoomSchedulings(schoolId, filters);
  }

  async createScheduling(schoolId: string, data: RoomSchedulingCreate): Promise<RoomScheduling> {
    return this.repo.createRoomScheduling(schoolId, data);
  }

  async updateScheduling(schoolId: string, id: string, data: Partial<RoomSchedulingCreate>): Promise<RoomScheduling> {
    const existing = await this.repo.findRoomSchedulingById(schoolId, id);
    if (!existing) throw new ScRoomSchedulingNotFoundError(id);
    return this.repo.updateRoomScheduling(schoolId, id, data);
  }

  async deleteScheduling(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRoomSchedulingById(schoolId, id);
    if (!existing) throw new ScRoomSchedulingNotFoundError(id);
    return this.repo.deleteRoomScheduling(schoolId, id);
  }

  async countSchedulings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRoomSchedulings(schoolId, filters);
  }
}
