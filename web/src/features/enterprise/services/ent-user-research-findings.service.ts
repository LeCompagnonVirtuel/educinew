// Enterprise Platform Service - UserResearchFindings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntResearchFindingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUserResearchFinding(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUserResearchFindingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUserResearchFindings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUserResearchFindings(schoolId, filters);
  }
  async createUserResearchFinding(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUserResearchFinding(schoolId, data);
  }
  async updateUserResearchFinding(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUserResearchFindingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUserResearchFinding(schoolId, id, data);
  }
  async deleteUserResearchFinding(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUserResearchFindingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUserResearchFinding(schoolId, id);
  }
  async countUserResearchFindings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUserResearchFindings(schoolId, filters);
  }
}
