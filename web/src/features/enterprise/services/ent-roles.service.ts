// Enterprise Platform Service - Roles
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRoleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRole(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRoleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRoles(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRoles(schoolId, filters);
  }
  async createRole(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRole(schoolId, data);
  }
  async updateRole(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRoleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRole(schoolId, id, data);
  }
  async deleteRole(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRoleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRole(schoolId, id);
  }
  async countRoles(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRoles(schoolId, filters);
  }
}
