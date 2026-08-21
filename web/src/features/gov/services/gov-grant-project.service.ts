// Government & National Governance Service - GrantProject
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { GrantProject, GrantProjectCreate } from '@educi/types';
import { GovGrantProjectNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovGrantProjectService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getGrantProject(schoolId: string, id: string): Promise<GrantProject> {
    const item = await this.repo.findGrantProjectById(schoolId, id);
    if (!item) throw new GovGrantProjectNotFoundError(id);
    return item;
  }

  async listGrantProjects(schoolId: string, filters?: Record<string, unknown>): Promise<GrantProject[]> {
    return this.repo.findAllGrantProjects(schoolId, filters);
  }

  async createGrantProject(schoolId: string, data: GrantProjectCreate): Promise<GrantProject> {
    return this.repo.createGrantProject(schoolId, data);
  }

  async updateGrantProject(schoolId: string, id: string, data: Partial<GrantProjectCreate>): Promise<GrantProject> {
    const existing = await this.repo.findGrantProjectById(schoolId, id);
    if (!existing) throw new GovGrantProjectNotFoundError(id);
    return this.repo.updateGrantProject(schoolId, id, data);
  }

  async deleteGrantProject(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGrantProjectById(schoolId, id);
    if (!existing) throw new GovGrantProjectNotFoundError(id);
    return this.repo.deleteGrantProject(schoolId, id);
  }

  async countGrantProjects(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGrantProjects(schoolId, filters);
  }
}
