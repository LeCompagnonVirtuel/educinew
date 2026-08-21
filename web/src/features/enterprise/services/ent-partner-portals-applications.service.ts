// Enterprise Platform Service - PartnerPortalsApplications
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPartnerApplicationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPartnerPortalsApplication(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPartnerPortalsApplicationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPartnerPortalsApplications(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPartnerPortalsApplications(schoolId, filters);
  }
  async createPartnerPortalsApplication(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPartnerPortalsApplication(schoolId, data);
  }
  async updatePartnerPortalsApplication(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPartnerPortalsApplicationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePartnerPortalsApplication(schoolId, id, data);
  }
  async deletePartnerPortalsApplication(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPartnerPortalsApplicationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePartnerPortalsApplication(schoolId, id);
  }
  async countPartnerPortalsApplications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPartnerPortalsApplications(schoolId, filters);
  }
}
