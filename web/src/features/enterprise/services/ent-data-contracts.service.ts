// Enterprise Platform Service - DataContracts
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataContractService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataContract(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataContractById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataContracts(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataContracts(schoolId, filters);
  }
  async createDataContract(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataContract(schoolId, data);
  }
  async updateDataContract(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataContractById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataContract(schoolId, id, data);
  }
  async deleteDataContract(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataContractById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataContract(schoolId, id);
  }
  async countDataContracts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataContracts(schoolId, filters);
  }
}
