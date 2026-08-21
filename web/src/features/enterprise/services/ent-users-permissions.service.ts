// Enterprise Platform Service - UsersPermissions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUserPermissionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUsersPermission(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUsersPermissionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUsersPermissions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUsersPermissions(schoolId, filters);
  }
  async createUsersPermission(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUsersPermission(schoolId, data);
  }
  async updateUsersPermission(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUsersPermissionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUsersPermission(schoolId, id, data);
  }
  async deleteUsersPermission(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUsersPermissionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUsersPermission(schoolId, id);
  }
  async countUsersPermissions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUsersPermissions(schoolId, filters);
  }
}
