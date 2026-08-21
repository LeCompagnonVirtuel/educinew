import type { SupabaseClient } from '@supabase/supabase-js';
import type { SmartRoom, SmartRoomCreate, SmartRoomUpdate } from '@educi/types';
import { ScSmartRoomNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSmartRoomService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getRoom(schoolId: string, id: string): Promise<SmartRoom> {
    const room = await this.repo.findSmartRoomById(schoolId, id);
    if (!room) throw new ScSmartRoomNotFoundError(id);
    return room;
  }

  async listRooms(schoolId: string, filters?: Record<string, unknown>): Promise<SmartRoom[]> {
    return this.repo.findAllSmartRooms(schoolId, filters);
  }

  async createRoom(schoolId: string, data: SmartRoomCreate): Promise<SmartRoom> {
    return this.repo.createSmartRoom(schoolId, data);
  }

  async updateRoom(schoolId: string, id: string, data: SmartRoomUpdate): Promise<SmartRoom> {
    const existing = await this.repo.findSmartRoomById(schoolId, id);
    if (!existing) throw new ScSmartRoomNotFoundError(id);
    return this.repo.updateSmartRoom(schoolId, id, data);
  }

  async deleteRoom(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSmartRoomById(schoolId, id);
    if (!existing) throw new ScSmartRoomNotFoundError(id);
    return this.repo.deleteSmartRoom(schoolId, id);
  }

  async findByRoomId(schoolId: string, roomId: string): Promise<SmartRoom | null> {
    return this.repo.findSmartRoomByRoomId(schoolId, roomId);
  }

  async findByBuildingId(schoolId: string, buildingId: string): Promise<SmartRoom[]> {
    return this.repo.findSmartRoomsByBuildingId(schoolId, buildingId);
  }

  async countRooms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSmartRooms(schoolId, filters);
  }
}
