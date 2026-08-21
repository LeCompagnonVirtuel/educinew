// Enterprise Platform Service - QualityGateResult
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { QualityGateResult, QualityGateResultCreate } from '@educi/types';
import { EntQualityGateResultNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntQualityGateResultService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getQualityGateResult(schoolId: string, id: string): Promise<QualityGateResult> {
    const item = await this.repo.findQualityGateResultById(schoolId, id);
    if (!item) throw new EntQualityGateResultNotFoundError(id);
    return item;
  }
  async listQualityGateResults(schoolId: string, filters?: Record<string, unknown>): Promise<QualityGateResult[]> {
    return this.repo.findAllQualityGateResults(schoolId, filters);
  }
  async createQualityGateResult(schoolId: string, data: QualityGateResultCreate): Promise<QualityGateResult> {
    return this.repo.createQualityGateResult(schoolId, data);
  }
  async updateQualityGateResult(schoolId: string, id: string, data: Partial<QualityGateResultCreate>): Promise<QualityGateResult> {
    const existing = await this.repo.findQualityGateResultById(schoolId, id);
    if (!existing) throw new EntQualityGateResultNotFoundError(id);
    return this.repo.updateQualityGateResult(schoolId, id, data);
  }
  async deleteQualityGateResult(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQualityGateResultById(schoolId, id);
    if (!existing) throw new EntQualityGateResultNotFoundError(id);
    return this.repo.deleteQualityGateResult(schoolId, id);
  }
  async countQualityGateResults(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countQualityGateResults(schoolId, filters);
  }
}
