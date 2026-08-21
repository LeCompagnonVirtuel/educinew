import type { SupabaseClient } from '@supabase/supabase-js';
import type { Room, RoomCreate, RoomUpdate } from '@educi/types';
import { ScRoomNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScRoomService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getRoom(schoolId: string, id: string): Promise<Room> {
    const room = await this.repo.findRoomById(schoolId, id);
    if (!room) throw new ScRoomNotFoundError(id);
    return room;
  }

  async listRooms(schoolId: string, filters?: Record<string, unknown>): Promise<Room[]> {
    return this.repo.findAllRooms(schoolId, filters);
  }

  async createRoom(schoolId: string, data: RoomCreate): Promise<Room> {
    return this.repo.createRoom(schoolId, data);
  }

  async updateRoom(schoolId: string, id: string, data: RoomUpdate): Promise<Room> {
    const existing = await this.repo.findRoomById(schoolId, id);
    if (!existing) throw new ScRoomNotFoundError(id);
    return this.repo.updateRoom(schoolId, id, data);
  }

  async deleteRoom(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRoomById(schoolId, id);
    if (!existing) throw new ScRoomNotFoundError(id);
    return this.repo.deleteRoom(schoolId, id);
  }

  async countRooms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRooms(schoolId, filters);
  }
}
