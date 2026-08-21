import type { SupabaseClient } from '@supabase/supabase-js';
import type { RoomReservation, RoomReservationCreate } from '@educi/types';
import { ScRoomReservationNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScRoomReservationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getReservation(schoolId: string, id: string): Promise<RoomReservation> {
    const reservation = await this.repo.findRoomReservationById(schoolId, id);
    if (!reservation) throw new ScRoomReservationNotFoundError(id);
    return reservation;
  }

  async listReservations(schoolId: string, filters?: Record<string, unknown>): Promise<RoomReservation[]> {
    return this.repo.findAllRoomReservations(schoolId, filters);
  }

  async createReservation(schoolId: string, data: RoomReservationCreate): Promise<RoomReservation> {
    return this.repo.createRoomReservation(schoolId, data);
  }

  async updateReservation(schoolId: string, id: string, data: Partial<RoomReservationCreate>): Promise<RoomReservation> {
    const existing = await this.repo.findRoomReservationById(schoolId, id);
    if (!existing) throw new ScRoomReservationNotFoundError(id);
    return this.repo.updateRoomReservation(schoolId, id, data);
  }

  async deleteReservation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRoomReservationById(schoolId, id);
    if (!existing) throw new ScRoomReservationNotFoundError(id);
    return this.repo.deleteRoomReservation(schoolId, id);
  }

  async countReservations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRoomReservations(schoolId, filters);
  }
}
