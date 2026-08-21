import type { SupabaseClient } from '@supabase/supabase-js';
import type { Occupancy, OccupancyCreate } from '@educi/types';
import { ScOccupancyNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScRoomOccupancyService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getOccupancy(schoolId: string, id: string): Promise<Occupancy> {
    const occupancy = await this.repo.findOccupancyById(schoolId, id);
    if (!occupancy) throw new ScOccupancyNotFoundError(id);
    return occupancy;
  }

  async getOccupancyByRoom(schoolId: string, roomId: string): Promise<Occupancy | null> {
    return this.repo.findOccupancyByRoom(schoolId, roomId);
  }

  async updateOccupancy(schoolId: string, id: string, data: Partial<OccupancyCreate>): Promise<Occupancy> {
    const existing = await this.repo.findOccupancyById(schoolId, id);
    if (!existing) throw new ScOccupancyNotFoundError(id);
    return this.repo.updateOccupancy(schoolId, id, data);
  }

  async getOccupancyRate(schoolId: string, buildingId: string, date: string): Promise<number> {
    return this.repo.getBuildingOccupancyRate(schoolId, buildingId);
  }

  async getDailyHistory(schoolId: string, buildingId: string, start: string, end: string): Promise<Occupancy[]> {
    return this.repo.getDailyOccupancyHistory(schoolId, buildingId, start, end);
  }

  async getFullRooms(schoolId: string): Promise<Occupancy[]> {
    return this.repo.findFullRooms(schoolId);
  }

  async getEmptyRooms(schoolId: string): Promise<Occupancy[]> {
    return this.repo.findEmptyRooms(schoolId);
  }

  async getAvailableRooms(schoolId: string, buildingId: string): Promise<Occupancy[]> {
    return this.repo.findAvailableRooms(schoolId, buildingId);
  }
}
