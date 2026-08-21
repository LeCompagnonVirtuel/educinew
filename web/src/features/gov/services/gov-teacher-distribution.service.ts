// Government & National Governance Service - TeacherDistribution
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TeacherDistribution, TeacherDistributionCreate } from '@educi/types';
import { GovTeacherDistributionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovTeacherDistributionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getTeacherDistribution(schoolId: string, id: string): Promise<TeacherDistribution> {
    const item = await this.repo.findTeacherDistributionById(schoolId, id);
    if (!item) throw new GovTeacherDistributionNotFoundError(id);
    return item;
  }

  async listTeacherDistributions(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherDistribution[]> {
    return this.repo.findAllTeacherDistributions(schoolId, filters);
  }

  async createTeacherDistribution(schoolId: string, data: TeacherDistributionCreate): Promise<TeacherDistribution> {
    return this.repo.createTeacherDistribution(schoolId, data);
  }

  async updateTeacherDistribution(schoolId: string, id: string, data: Partial<TeacherDistributionCreate>): Promise<TeacherDistribution> {
    const existing = await this.repo.findTeacherDistributionById(schoolId, id);
    if (!existing) throw new GovTeacherDistributionNotFoundError(id);
    return this.repo.updateTeacherDistribution(schoolId, id, data);
  }

  async deleteTeacherDistribution(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTeacherDistributionById(schoolId, id);
    if (!existing) throw new GovTeacherDistributionNotFoundError(id);
    return this.repo.deleteTeacherDistribution(schoolId, id);
  }

  async countTeacherDistributions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTeacherDistributions(schoolId, filters);
  }
}
