// Enterprise Platform Service - AffiliatePrograms
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAffiliateProgramService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAffiliateProgram(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAffiliateProgramById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAffiliatePrograms(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAffiliatePrograms(schoolId, filters);
  }
  async createAffiliateProgram(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAffiliateProgram(schoolId, data);
  }
  async updateAffiliateProgram(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAffiliateProgramById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAffiliateProgram(schoolId, id, data);
  }
  async deleteAffiliateProgram(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAffiliateProgramById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAffiliateProgram(schoolId, id);
  }
  async countAffiliatePrograms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAffiliatePrograms(schoolId, filters);
  }
}
