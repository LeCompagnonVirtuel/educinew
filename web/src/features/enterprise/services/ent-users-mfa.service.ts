// Enterprise Platform Service - UsersMfa
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUserMfaService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUsersMfa(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUsersMfaById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUsersMfa(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUsersMfa(schoolId, filters);
  }
  async createUsersMfa(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUsersMfa(schoolId, data);
  }
  async updateUsersMfa(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUsersMfaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUsersMfa(schoolId, id, data);
  }
  async deleteUsersMfa(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUsersMfaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUsersMfa(schoolId, id);
  }
  async countUsersMfa(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUsersMfa(schoolId, filters);
  }
}
