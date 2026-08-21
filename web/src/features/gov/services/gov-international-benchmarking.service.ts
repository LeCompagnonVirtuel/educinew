// Government & National Governance Service - InternationalBenchmarking
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalBenchmarking, InternationalBenchmarkingCreate } from '@educi/types';
import { GovInternationalBenchmarkingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInternationalBenchmarkingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInternationalBenchmarking(schoolId: string, id: string): Promise<InternationalBenchmarking> {
    const item = await this.repo.findInternationalBenchmarkingById(schoolId, id);
    if (!item) throw new GovInternationalBenchmarkingNotFoundError(id);
    return item;
  }

  async listInternationalBenchmarkings(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalBenchmarking[]> {
    return this.repo.findAllInternationalBenchmarkings(schoolId, filters);
  }

  async createInternationalBenchmarking(schoolId: string, data: InternationalBenchmarkingCreate): Promise<InternationalBenchmarking> {
    return this.repo.createInternationalBenchmarking(schoolId, data);
  }

  async updateInternationalBenchmarking(schoolId: string, id: string, data: Partial<InternationalBenchmarkingCreate>): Promise<InternationalBenchmarking> {
    const existing = await this.repo.findInternationalBenchmarkingById(schoolId, id);
    if (!existing) throw new GovInternationalBenchmarkingNotFoundError(id);
    return this.repo.updateInternationalBenchmarking(schoolId, id, data);
  }

  async deleteInternationalBenchmarking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalBenchmarkingById(schoolId, id);
    if (!existing) throw new GovInternationalBenchmarkingNotFoundError(id);
    return this.repo.deleteInternationalBenchmarking(schoolId, id);
  }

  async countInternationalBenchmarkings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInternationalBenchmarkings(schoolId, filters);
  }
}
