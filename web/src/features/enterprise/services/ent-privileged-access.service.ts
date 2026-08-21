// Enterprise Platform Service - PrivilegedAccess
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPrivilegedAccessService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPrivilegedAccess(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPrivilegedAccessById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPrivilegedAccess(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPrivilegedAccess(schoolId, filters);
  }
  async createPrivilegedAccess(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPrivilegedAccess(schoolId, data);
  }
  async updatePrivilegedAccess(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPrivilegedAccessById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePrivilegedAccess(schoolId, id, data);
  }
  async deletePrivilegedAccess(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPrivilegedAccessById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePrivilegedAccess(schoolId, id);
  }
  async countPrivilegedAccess(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPrivilegedAccess(schoolId, filters);
  }
}
