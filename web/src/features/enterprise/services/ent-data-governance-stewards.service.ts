// Enterprise Platform Service - DataGovernanceStewards
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataStewardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataGovernanceSteward(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataGovernanceStewardById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataGovernanceStewards(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataGovernanceStewards(schoolId, filters);
  }
  async createDataGovernanceSteward(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataGovernanceSteward(schoolId, data);
  }
  async updateDataGovernanceSteward(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataGovernanceStewardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataGovernanceSteward(schoolId, id, data);
  }
  async deleteDataGovernanceSteward(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataGovernanceStewardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataGovernanceSteward(schoolId, id);
  }
  async countDataGovernanceStewards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataGovernanceStewards(schoolId, filters);
  }
}
