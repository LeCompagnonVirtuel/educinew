// Government & National Governance Service - PermissionEvaluator
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PermissionEvaluator, PermissionEvaluatorCreate } from '@educi/types';
import { GovPermissionEvaluatorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPermissionEvaluatorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getPermissionEvaluator(schoolId: string, id: string): Promise<PermissionEvaluator> {
    const item = await this.repo.findPermissionEvaluatorById(schoolId, id);
    if (!item) throw new GovPermissionEvaluatorNotFoundError(id);
    return item;
  }

  async listPermissionEvaluators(schoolId: string, filters?: Record<string, unknown>): Promise<PermissionEvaluator[]> {
    return this.repo.findAllPermissionEvaluators(schoolId, filters);
  }

  async createPermissionEvaluator(schoolId: string, data: PermissionEvaluatorCreate): Promise<PermissionEvaluator> {
    return this.repo.createPermissionEvaluator(schoolId, data);
  }

  async updatePermissionEvaluator(schoolId: string, id: string, data: Partial<PermissionEvaluatorCreate>): Promise<PermissionEvaluator> {
    const existing = await this.repo.findPermissionEvaluatorById(schoolId, id);
    if (!existing) throw new GovPermissionEvaluatorNotFoundError(id);
    return this.repo.updatePermissionEvaluator(schoolId, id, data);
  }

  async deletePermissionEvaluator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPermissionEvaluatorById(schoolId, id);
    if (!existing) throw new GovPermissionEvaluatorNotFoundError(id);
    return this.repo.deletePermissionEvaluator(schoolId, id);
  }

  async countPermissionEvaluators(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPermissionEvaluators(schoolId, filters);
  }
}
