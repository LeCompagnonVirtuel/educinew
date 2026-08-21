// Enterprise Platform Service - PerformanceBudgetsViolations
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBudgetViolationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPerformanceBudgetsViolation(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPerformanceBudgetsViolationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPerformanceBudgetsViolations(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPerformanceBudgetsViolations(schoolId, filters);
  }
  async createPerformanceBudgetsViolation(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPerformanceBudgetsViolation(schoolId, data);
  }
  async updatePerformanceBudgetsViolation(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPerformanceBudgetsViolationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePerformanceBudgetsViolation(schoolId, id, data);
  }
  async deletePerformanceBudgetsViolation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPerformanceBudgetsViolationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePerformanceBudgetsViolation(schoolId, id);
  }
  async countPerformanceBudgetsViolations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPerformanceBudgetsViolations(schoolId, filters);
  }
}
