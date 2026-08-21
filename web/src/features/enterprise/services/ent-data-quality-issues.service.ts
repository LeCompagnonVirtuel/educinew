// Enterprise Platform Service - DataQualityIssues
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntQualityIssueService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataQualityIssue(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataQualityIssueById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataQualityIssues(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataQualityIssues(schoolId, filters);
  }
  async createDataQualityIssue(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataQualityIssue(schoolId, data);
  }
  async updateDataQualityIssue(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataQualityIssueById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataQualityIssue(schoolId, id, data);
  }
  async deleteDataQualityIssue(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataQualityIssueById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataQualityIssue(schoolId, id);
  }
  async countDataQualityIssues(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataQualityIssues(schoolId, filters);
  }
}
