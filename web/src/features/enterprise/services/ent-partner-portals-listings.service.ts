// Enterprise Platform Service - PartnerPortalsListings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPartnerListingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPartnerPortalsListing(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPartnerPortalsListingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPartnerPortalsListings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPartnerPortalsListings(schoolId, filters);
  }
  async createPartnerPortalsListing(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPartnerPortalsListing(schoolId, data);
  }
  async updatePartnerPortalsListing(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPartnerPortalsListingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePartnerPortalsListing(schoolId, id, data);
  }
  async deletePartnerPortalsListing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPartnerPortalsListingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePartnerPortalsListing(schoolId, id);
  }
  async countPartnerPortalsListings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPartnerPortalsListings(schoolId, filters);
  }
}
