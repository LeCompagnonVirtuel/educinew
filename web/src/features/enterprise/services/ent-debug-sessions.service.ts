// Enterprise Platform Service - DebugSessions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDebugSessionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDebugSession(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDebugSessionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDebugSessions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDebugSessions(schoolId, filters);
  }
  async createDebugSession(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDebugSession(schoolId, data);
  }
  async updateDebugSession(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDebugSessionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDebugSession(schoolId, id, data);
  }
  async deleteDebugSession(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDebugSessionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDebugSession(schoolId, id);
  }
  async countDebugSessions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDebugSessions(schoolId, filters);
  }
}
