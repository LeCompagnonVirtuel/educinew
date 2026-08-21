// Enterprise Platform Service - Sessions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSessionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSession(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSessionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSessions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSessions(schoolId, filters);
  }
  async createSession(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSession(schoolId, data);
  }
  async updateSession(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSessionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSession(schoolId, id, data);
  }
  async deleteSession(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSessionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSession(schoolId, id);
  }
  async countSessions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSessions(schoolId, filters);
  }
}
