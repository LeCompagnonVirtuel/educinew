// Enterprise Platform Service - RunbooksExecutions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRunbookExecutionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRunbooksExecution(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRunbooksExecutionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRunbooksExecutions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRunbooksExecutions(schoolId, filters);
  }
  async createRunbooksExecution(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRunbooksExecution(schoolId, data);
  }
  async updateRunbooksExecution(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRunbooksExecutionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRunbooksExecution(schoolId, id, data);
  }
  async deleteRunbooksExecution(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRunbooksExecutionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRunbooksExecution(schoolId, id);
  }
  async countRunbooksExecutions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRunbooksExecutions(schoolId, filters);
  }
}
