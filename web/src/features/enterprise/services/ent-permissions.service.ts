// Enterprise Platform Service - Permissions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPermissionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPermission(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPermissionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPermissions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPermissions(schoolId, filters);
  }
  async createPermission(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPermission(schoolId, data);
  }
  async updatePermission(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPermissionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePermission(schoolId, id, data);
  }
  async deletePermission(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPermissionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePermission(schoolId, id);
  }
  async countPermissions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPermissions(schoolId, filters);
  }
}
