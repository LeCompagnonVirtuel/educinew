// Enterprise Platform Service - HistoricalStorage
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { HistoricalStorage, HistoricalStorageCreate } from '@educi/types';
import { EntHistoricalStorageNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntHistoricalStorageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getHistoricalStorage(schoolId: string, id: string): Promise<HistoricalStorage> {
    const item = await this.repo.findHistoricalStorageById(schoolId, id);
    if (!item) throw new EntHistoricalStorageNotFoundError(id);
    return item;
  }
  async listHistoricalStorages(schoolId: string, filters?: Record<string, unknown>): Promise<HistoricalStorage[]> {
    return this.repo.findAllHistoricalStorages(schoolId, filters);
  }
  async createHistoricalStorage(schoolId: string, data: HistoricalStorageCreate): Promise<HistoricalStorage> {
    return this.repo.createHistoricalStorage(schoolId, data);
  }
  async updateHistoricalStorage(schoolId: string, id: string, data: Partial<HistoricalStorageCreate>): Promise<HistoricalStorage> {
    const existing = await this.repo.findHistoricalStorageById(schoolId, id);
    if (!existing) throw new EntHistoricalStorageNotFoundError(id);
    return this.repo.updateHistoricalStorage(schoolId, id, data);
  }
  async deleteHistoricalStorage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findHistoricalStorageById(schoolId, id);
    if (!existing) throw new EntHistoricalStorageNotFoundError(id);
    return this.repo.deleteHistoricalStorage(schoolId, id);
  }
  async countHistoricalStorages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countHistoricalStorages(schoolId, filters);
  }
}
