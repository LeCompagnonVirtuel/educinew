// Enterprise Platform Service - PartnerPortals
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPartnerPortalService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPartnerPortal(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPartnerPortalById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPartnerPortals(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPartnerPortals(schoolId, filters);
  }
  async createPartnerPortal(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPartnerPortal(schoolId, data);
  }
  async updatePartnerPortal(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPartnerPortalById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePartnerPortal(schoolId, id, data);
  }
  async deletePartnerPortal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPartnerPortalById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePartnerPortal(schoolId, id);
  }
  async countPartnerPortals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPartnerPortals(schoolId, filters);
  }
}
