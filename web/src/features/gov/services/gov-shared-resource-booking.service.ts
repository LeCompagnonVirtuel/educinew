// Government & National Governance Service - SharedResourceBooking
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SharedResourceBooking, SharedResourceBookingCreate } from '@educi/types';
import { GovSharedResourceBookingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSharedResourceBookingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSharedResourceBooking(schoolId: string, id: string): Promise<SharedResourceBooking> {
    const item = await this.repo.findSharedResourceBookingById(schoolId, id);
    if (!item) throw new GovSharedResourceBookingNotFoundError(id);
    return item;
  }

  async listSharedResourceBookings(schoolId: string, filters?: Record<string, unknown>): Promise<SharedResourceBooking[]> {
    return this.repo.findAllSharedResourceBookings(schoolId, filters);
  }

  async createSharedResourceBooking(schoolId: string, data: SharedResourceBookingCreate): Promise<SharedResourceBooking> {
    return this.repo.createSharedResourceBooking(schoolId, data);
  }

  async updateSharedResourceBooking(schoolId: string, id: string, data: Partial<SharedResourceBookingCreate>): Promise<SharedResourceBooking> {
    const existing = await this.repo.findSharedResourceBookingById(schoolId, id);
    if (!existing) throw new GovSharedResourceBookingNotFoundError(id);
    return this.repo.updateSharedResourceBooking(schoolId, id, data);
  }

  async deleteSharedResourceBooking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSharedResourceBookingById(schoolId, id);
    if (!existing) throw new GovSharedResourceBookingNotFoundError(id);
    return this.repo.deleteSharedResourceBooking(schoolId, id);
  }

  async countSharedResourceBookings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSharedResourceBookings(schoolId, filters);
  }
}
