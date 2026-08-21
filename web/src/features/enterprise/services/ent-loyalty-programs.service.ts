// Enterprise Platform Service - LoyaltyPrograms
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLoyaltyProgramService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLoyaltyProgram(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLoyaltyProgramById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLoyaltyPrograms(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLoyaltyPrograms(schoolId, filters);
  }
  async createLoyaltyProgram(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLoyaltyProgram(schoolId, data);
  }
  async updateLoyaltyProgram(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLoyaltyProgramById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLoyaltyProgram(schoolId, id, data);
  }
  async deleteLoyaltyProgram(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLoyaltyProgramById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLoyaltyProgram(schoolId, id);
  }
  async countLoyaltyPrograms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLoyaltyPrograms(schoolId, filters);
  }
}
