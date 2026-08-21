// Enterprise Platform Service - Procedures
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProcedureService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProcedure(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findProcedureById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listProcedures(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllProcedures(schoolId, filters);
  }
  async createProcedure(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createProcedure(schoolId, data);
  }
  async updateProcedure(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findProcedureById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateProcedure(schoolId, id, data);
  }
  async deleteProcedure(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProcedureById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteProcedure(schoolId, id);
  }
  async countProcedures(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProcedures(schoolId, filters);
  }
}
