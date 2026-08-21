import type { SupabaseClient } from '@supabase/supabase-js';
import type { SharedResourceBooking, SharedResourceBookingCreate } from '@educi/types';
import { GovSharedResourceBookingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDigitalTwinSharedResourceBookingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<SharedResourceBooking> {
    const item = await this.repo.findSharedResourceBookingById(schoolId, id);
    if (!item) throw new GovSharedResourceBookingNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<SharedResourceBooking[]> {
    return this.repo.findAllSharedResourceBookings(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<SharedResourceBookingCreate>): Promise<SharedResourceBooking> {
    return this.repo.createSharedResourceBooking(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<SharedResourceBookingCreate>): Promise<SharedResourceBooking> {
    const existing = await this.repo.findSharedResourceBookingById(schoolId, id);
    if (!existing) throw new GovSharedResourceBookingNotFoundError(id);
    return this.repo.updateSharedResourceBooking(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSharedResourceBookingById(schoolId, id);
    if (!existing) throw new GovSharedResourceBookingNotFoundError(id);
    return this.repo.deleteSharedResourceBooking(schoolId, id);
  }
}
