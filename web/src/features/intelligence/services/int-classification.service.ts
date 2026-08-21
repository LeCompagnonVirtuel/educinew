// Intelligence Platform Service - AutoClassification
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutoClassification, AutoClassificationCreate } from '@educi/types';
import { IntClassificationNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntClassificationService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getAutoClassification(schoolId: string, id: string): Promise<AutoClassification> {
    const item = await this.repo.getAutoClassification(id, schoolId);
    if (!item) throw new IntClassificationNotFoundError(id);
    return item;
  }
  async listClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<AutoClassification[]> {
    return this.repo.listClassifications(schoolId, filters);
  }
  async createAutoClassification(schoolId: string, data: AutoClassificationCreate): Promise<AutoClassification> {
    return this.repo.createAutoClassification({ ...data, school_id: schoolId });
  }
  async updateAutoClassification(schoolId: string, id: string, data: Partial<AutoClassificationCreate>): Promise<AutoClassification> {
    const existing = await this.repo.getAutoClassification(id, schoolId);
    if (!existing) throw new IntClassificationNotFoundError(id);
    return this.repo.updateAutoClassification(id, schoolId, data);
  }
  async deleteAutoClassification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutoClassification(id, schoolId);
    if (!existing) throw new IntClassificationNotFoundError(id);
    return this.repo.deleteAutoClassification(id, schoolId);
  }
}
