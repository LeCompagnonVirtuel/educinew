import type { SupabaseClient } from '@supabase/supabase-js';
import type { BookReservation, BookReservationCreate } from '@educi/types';
import { ScReservationNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBookReservationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getReservation(schoolId: string, id: string): Promise<BookReservation> {
    const reservation = await this.repo.findBookReservationById(schoolId, id);
    if (!reservation) throw new ScReservationNotFoundError(id);
    return reservation;
  }

  async listReservations(schoolId: string, filters?: Record<string, unknown>): Promise<BookReservation[]> {
    return this.repo.findAllBookReservations(schoolId, filters);
  }

  async createReservation(schoolId: string, data: BookReservationCreate): Promise<BookReservation> {
    return this.repo.createBookReservation(schoolId, data);
  }

  async updateReservation(schoolId: string, id: string, data: Partial<BookReservationCreate>): Promise<BookReservation> {
    const existing = await this.repo.findBookReservationById(schoolId, id);
    if (!existing) throw new ScReservationNotFoundError(id);
    return this.repo.updateBookReservation(schoolId, id, data);
  }

  async deleteReservation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBookReservationById(schoolId, id);
    if (!existing) throw new ScReservationNotFoundError(id);
    return this.repo.deleteBookReservation(schoolId, id);
  }

  async countReservations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBookReservations(schoolId, filters);
  }
}
