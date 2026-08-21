// Enterprise Platform Service - UsersRoles
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUserRoleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUsersRole(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUsersRoleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUsersRoles(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUsersRoles(schoolId, filters);
  }
  async createUsersRole(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUsersRole(schoolId, data);
  }
  async updateUsersRole(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUsersRoleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUsersRole(schoolId, id, data);
  }
  async deleteUsersRole(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUsersRoleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUsersRole(schoolId, id);
  }
  async countUsersRoles(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUsersRoles(schoolId, filters);
  }
}
