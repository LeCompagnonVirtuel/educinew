// Enterprise Platform Service - Permission
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Permission, PermissionCreate } from '@educi/types';
import { EntPermissionNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPermissionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPermission(schoolId: string, id: string): Promise<Permission> {
    const item = await this.repo.findPermissionById(schoolId, id);
    if (!item) throw new EntPermissionNotFoundError(id);
    return item;
  }
  async listPermissions(schoolId: string, filters?: Record<string, unknown>): Promise<Permission[]> {
    return this.repo.findAllPermissions(schoolId, filters);
  }
  async createPermission(schoolId: string, data: PermissionCreate): Promise<Permission> {
    return this.repo.createPermission(schoolId, data);
  }
  async updatePermission(schoolId: string, id: string, data: Partial<PermissionCreate>): Promise<Permission> {
    const existing = await this.repo.findPermissionById(schoolId, id);
    if (!existing) throw new EntPermissionNotFoundError(id);
    return this.repo.updatePermission(schoolId, id, data);
  }
  async deletePermission(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPermissionById(schoolId, id);
    if (!existing) throw new EntPermissionNotFoundError(id);
    return this.repo.deletePermission(schoolId, id);
  }
  async countPermissions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPermissions(schoolId, filters);
  }
}
