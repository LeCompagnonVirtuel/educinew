// Enterprise Platform Service - UserResearch
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUserResearchService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUserResearch(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUserResearchById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUserResearch(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUserResearch(schoolId, filters);
  }
  async createUserResearch(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUserResearch(schoolId, data);
  }
  async updateUserResearch(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUserResearchById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUserResearch(schoolId, id, data);
  }
  async deleteUserResearch(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUserResearchById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUserResearch(schoolId, id);
  }
  async countUserResearch(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUserResearch(schoolId, filters);
  }
}
