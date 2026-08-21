// Enterprise Platform Service - UserResearchSessions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntResearchSessionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUserResearchSession(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUserResearchSessionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUserResearchSessions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUserResearchSessions(schoolId, filters);
  }
  async createUserResearchSession(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUserResearchSession(schoolId, data);
  }
  async updateUserResearchSession(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUserResearchSessionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUserResearchSession(schoolId, id, data);
  }
  async deleteUserResearchSession(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUserResearchSessionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUserResearchSession(schoolId, id);
  }
  async countUserResearchSessions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUserResearchSessions(schoolId, filters);
  }
}
