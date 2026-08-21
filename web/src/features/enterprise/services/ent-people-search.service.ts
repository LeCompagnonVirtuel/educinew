// Enterprise Platform Service - PeopleSearch
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PeopleSearch, PeopleSearchCreate } from '@educi/types';
import { EntPeopleSearchNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPeopleSearchService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPeopleSearch(schoolId: string, id: string): Promise<PeopleSearch> {
    const item = await this.repo.findPeopleSearchById(schoolId, id);
    if (!item) throw new EntPeopleSearchNotFoundError(id);
    return item;
  }
  async listPeopleSearchs(schoolId: string, filters?: Record<string, unknown>): Promise<PeopleSearch[]> {
    return this.repo.findAllPeopleSearchs(schoolId, filters);
  }
  async createPeopleSearch(schoolId: string, data: PeopleSearchCreate): Promise<PeopleSearch> {
    return this.repo.createPeopleSearch(schoolId, data);
  }
  async updatePeopleSearch(schoolId: string, id: string, data: Partial<PeopleSearchCreate>): Promise<PeopleSearch> {
    const existing = await this.repo.findPeopleSearchById(schoolId, id);
    if (!existing) throw new EntPeopleSearchNotFoundError(id);
    return this.repo.updatePeopleSearch(schoolId, id, data);
  }
  async deletePeopleSearch(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPeopleSearchById(schoolId, id);
    if (!existing) throw new EntPeopleSearchNotFoundError(id);
    return this.repo.deletePeopleSearch(schoolId, id);
  }
  async countPeopleSearchs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPeopleSearchs(schoolId, filters);
  }
}
