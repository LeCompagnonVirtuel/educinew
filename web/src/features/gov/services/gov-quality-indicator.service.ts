// Government & National Governance Service - QualityIndicator
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { QualityIndicator, QualityIndicatorCreate } from '@educi/types';
import { GovQualityIndicatorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovQualityIndicatorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getQualityIndicator(schoolId: string, id: string): Promise<QualityIndicator> {
    const item = await this.repo.findQualityIndicatorById(schoolId, id);
    if (!item) throw new GovQualityIndicatorNotFoundError(id);
    return item;
  }

  async listQualityIndicators(schoolId: string, filters?: Record<string, unknown>): Promise<QualityIndicator[]> {
    return this.repo.findAllQualityIndicators(schoolId, filters);
  }

  async createQualityIndicator(schoolId: string, data: QualityIndicatorCreate): Promise<QualityIndicator> {
    return this.repo.createQualityIndicator(schoolId, data);
  }

  async updateQualityIndicator(schoolId: string, id: string, data: Partial<QualityIndicatorCreate>): Promise<QualityIndicator> {
    const existing = await this.repo.findQualityIndicatorById(schoolId, id);
    if (!existing) throw new GovQualityIndicatorNotFoundError(id);
    return this.repo.updateQualityIndicator(schoolId, id, data);
  }

  async deleteQualityIndicator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQualityIndicatorById(schoolId, id);
    if (!existing) throw new GovQualityIndicatorNotFoundError(id);
    return this.repo.deleteQualityIndicator(schoolId, id);
  }

  async countQualityIndicators(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countQualityIndicators(schoolId, filters);
  }
}
