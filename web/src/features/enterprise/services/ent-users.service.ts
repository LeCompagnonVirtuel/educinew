// Enterprise Platform Service - Users
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUserService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUser(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUserById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUsers(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUsers(schoolId, filters);
  }
  async createUser(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUser(schoolId, data);
  }
  async updateUser(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUserById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUser(schoolId, id, data);
  }
  async deleteUser(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUserById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUser(schoolId, id);
  }
  async countUsers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUsers(schoolId, filters);
  }
}
