// Enterprise Platform Service - RunbooksSteps
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRunbookStepService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRunbooksStep(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRunbooksStepById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRunbooksSteps(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRunbooksSteps(schoolId, filters);
  }
  async createRunbooksStep(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRunbooksStep(schoolId, data);
  }
  async updateRunbooksStep(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRunbooksStepById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRunbooksStep(schoolId, id, data);
  }
  async deleteRunbooksStep(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRunbooksStepById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRunbooksStep(schoolId, id);
  }
  async countRunbooksSteps(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRunbooksSteps(schoolId, filters);
  }
}
