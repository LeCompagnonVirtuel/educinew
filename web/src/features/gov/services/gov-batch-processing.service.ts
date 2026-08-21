// Government & National Governance Service - BatchProcessing
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BatchProcessing, BatchProcessingCreate } from '@educi/types';
import { GovBatchProcessingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovBatchProcessingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getBatchProcessing(schoolId: string, id: string): Promise<BatchProcessing> {
    const item = await this.repo.findBatchProcessingById(schoolId, id);
    if (!item) throw new GovBatchProcessingNotFoundError(id);
    return item;
  }

  async listBatchProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<BatchProcessing[]> {
    return this.repo.findAllBatchProcessings(schoolId, filters);
  }

  async createBatchProcessing(schoolId: string, data: BatchProcessingCreate): Promise<BatchProcessing> {
    return this.repo.createBatchProcessing(schoolId, data);
  }

  async updateBatchProcessing(schoolId: string, id: string, data: Partial<BatchProcessingCreate>): Promise<BatchProcessing> {
    const existing = await this.repo.findBatchProcessingById(schoolId, id);
    if (!existing) throw new GovBatchProcessingNotFoundError(id);
    return this.repo.updateBatchProcessing(schoolId, id, data);
  }

  async deleteBatchProcessing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBatchProcessingById(schoolId, id);
    if (!existing) throw new GovBatchProcessingNotFoundError(id);
    return this.repo.deleteBatchProcessing(schoolId, id);
  }

  async countBatchProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBatchProcessings(schoolId, filters);
  }
}
