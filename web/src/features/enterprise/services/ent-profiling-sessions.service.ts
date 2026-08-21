// Enterprise Platform Service - ProfilingSessions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProfilingSessionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProfilingSession(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findProfilingSessionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listProfilingSessions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllProfilingSessions(schoolId, filters);
  }
  async createProfilingSession(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createProfilingSession(schoolId, data);
  }
  async updateProfilingSession(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findProfilingSessionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateProfilingSession(schoolId, id, data);
  }
  async deleteProfilingSession(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProfilingSessionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteProfilingSession(schoolId, id);
  }
  async countProfilingSessions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProfilingSessions(schoolId, filters);
  }
}
