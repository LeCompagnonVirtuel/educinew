import type { SupabaseClient } from '@supabase/supabase-js';
import type { Room, RoomCreate, RoomUpdate, Bed, BedCreate, BedUpdate } from '@educi/types';
import { ScRoomNotFoundError, ScBedNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScRoomManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getRoom(schoolId: string, id: string): Promise<Room> {
    const room = await this.repo.findRoomById(schoolId, id);
    if (!room) throw new ScRoomNotFoundError(id);
    return room;
  }

  async listRoomsByBuilding(schoolId: string, buildingId: string): Promise<Room[]> {
    return this.repo.findRoomsByBuilding(schoolId, buildingId);
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

  async createBed(schoolId: string, data: BedCreate): Promise<Bed> {
    return this.repo.createBed(schoolId, data);
  }

  async updateBed(schoolId: string, id: string, data: BedUpdate): Promise<Bed> {
    const existing = await this.repo.findBedById(schoolId, id);
    if (!existing) throw new ScBedNotFoundError(id);
    return this.repo.updateBed(schoolId, id, data);
  }

  async getAvailableBeds(schoolId: string, roomId: string): Promise<Bed[]> {
    return this.repo.findAvailableBeds(schoolId, roomId);
  }
}
