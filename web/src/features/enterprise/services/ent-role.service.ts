// Enterprise Platform Service - Role
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Role, RoleCreate } from '@educi/types';
import { EntRoleNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRoleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRole(schoolId: string, id: string): Promise<Role> {
    const item = await this.repo.findRoleById(schoolId, id);
    if (!item) throw new EntRoleNotFoundError(id);
    return item;
  }
  async listRoles(schoolId: string, filters?: Record<string, unknown>): Promise<Role[]> {
    return this.repo.findAllRoles(schoolId, filters);
  }
  async createRole(schoolId: string, data: RoleCreate): Promise<Role> {
    return this.repo.createRole(schoolId, data);
  }
  async updateRole(schoolId: string, id: string, data: Partial<RoleCreate>): Promise<Role> {
    const existing = await this.repo.findRoleById(schoolId, id);
    if (!existing) throw new EntRoleNotFoundError(id);
    return this.repo.updateRole(schoolId, id, data);
  }
  async deleteRole(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRoleById(schoolId, id);
    if (!existing) throw new EntRoleNotFoundError(id);
    return this.repo.deleteRole(schoolId, id);
  }
  async countRoles(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRoles(schoolId, filters);
  }
}
