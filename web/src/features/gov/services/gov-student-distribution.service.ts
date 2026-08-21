// Government & National Governance Service - StudentDistribution
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { StudentDistribution, StudentDistributionCreate } from '@educi/types';
import { GovStudentDistributionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovStudentDistributionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getStudentDistribution(schoolId: string, id: string): Promise<StudentDistribution> {
    const item = await this.repo.findStudentDistributionById(schoolId, id);
    if (!item) throw new GovStudentDistributionNotFoundError(id);
    return item;
  }

  async listStudentDistributions(schoolId: string, filters?: Record<string, unknown>): Promise<StudentDistribution[]> {
    return this.repo.findAllStudentDistributions(schoolId, filters);
  }

  async createStudentDistribution(schoolId: string, data: StudentDistributionCreate): Promise<StudentDistribution> {
    return this.repo.createStudentDistribution(schoolId, data);
  }

  async updateStudentDistribution(schoolId: string, id: string, data: Partial<StudentDistributionCreate>): Promise<StudentDistribution> {
    const existing = await this.repo.findStudentDistributionById(schoolId, id);
    if (!existing) throw new GovStudentDistributionNotFoundError(id);
    return this.repo.updateStudentDistribution(schoolId, id, data);
  }

  async deleteStudentDistribution(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStudentDistributionById(schoolId, id);
    if (!existing) throw new GovStudentDistributionNotFoundError(id);
    return this.repo.deleteStudentDistribution(schoolId, id);
  }

  async countStudentDistributions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStudentDistributions(schoolId, filters);
  }
}
