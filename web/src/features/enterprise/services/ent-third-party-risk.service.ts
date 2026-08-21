// Enterprise Platform Service - ThirdPartyRisk
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntThirdPartyRiskService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getThirdPartyRisk(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findThirdPartyRiskById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listThirdPartyRisk(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllThirdPartyRisk(schoolId, filters);
  }
  async createThirdPartyRisk(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createThirdPartyRisk(schoolId, data);
  }
  async updateThirdPartyRisk(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findThirdPartyRiskById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateThirdPartyRisk(schoolId, id, data);
  }
  async deleteThirdPartyRisk(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findThirdPartyRiskById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteThirdPartyRisk(schoolId, id);
  }
  async countThirdPartyRisk(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countThirdPartyRisk(schoolId, filters);
  }
}
