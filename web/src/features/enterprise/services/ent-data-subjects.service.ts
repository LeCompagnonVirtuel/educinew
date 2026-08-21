// Enterprise Platform Service - DataSubjects
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataSubject(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataSubjectById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataSubjects(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataSubjects(schoolId, filters);
  }
  async createDataSubject(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataSubject(schoolId, data);
  }
  async updateDataSubject(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataSubjectById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataSubject(schoolId, id, data);
  }
  async deleteDataSubject(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataSubjectById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataSubject(schoolId, id);
  }
  async countDataSubjects(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataSubjects(schoolId, filters);
  }
}
