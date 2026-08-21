// Enterprise Platform Service - SchoolSearch
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolSearch, SchoolSearchCreate } from '@educi/types';
import { EntSchoolSearchNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchoolSearchService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchoolSearch(schoolId: string, id: string): Promise<SchoolSearch> {
    const item = await this.repo.findSchoolSearchById(schoolId, id);
    if (!item) throw new EntSchoolSearchNotFoundError(id);
    return item;
  }
  async listSchoolSearchs(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolSearch[]> {
    return this.repo.findAllSchoolSearchs(schoolId, filters);
  }
  async createSchoolSearch(schoolId: string, data: SchoolSearchCreate): Promise<SchoolSearch> {
    return this.repo.createSchoolSearch(schoolId, data);
  }
  async updateSchoolSearch(schoolId: string, id: string, data: Partial<SchoolSearchCreate>): Promise<SchoolSearch> {
    const existing = await this.repo.findSchoolSearchById(schoolId, id);
    if (!existing) throw new EntSchoolSearchNotFoundError(id);
    return this.repo.updateSchoolSearch(schoolId, id, data);
  }
  async deleteSchoolSearch(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolSearchById(schoolId, id);
    if (!existing) throw new EntSchoolSearchNotFoundError(id);
    return this.repo.deleteSchoolSearch(schoolId, id);
  }
  async countSchoolSearchs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolSearchs(schoolId, filters);
  }
}
