// Enterprise Platform Service - CommissionStructures
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCommissionStructureService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCommissionStructure(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCommissionStructureById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCommissionStructures(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCommissionStructures(schoolId, filters);
  }
  async createCommissionStructure(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCommissionStructure(schoolId, data);
  }
  async updateCommissionStructure(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCommissionStructureById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCommissionStructure(schoolId, id, data);
  }
  async deleteCommissionStructure(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCommissionStructureById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCommissionStructure(schoolId, id);
  }
  async countCommissionStructures(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCommissionStructures(schoolId, filters);
  }
}
