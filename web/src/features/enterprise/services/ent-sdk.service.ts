// Enterprise Platform Service - SDK
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SDK, SDKCreate } from '@educi/types';
import { EntSdkNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSdkService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSdk(schoolId: string, id: string): Promise<SDK> {
    const item = await this.repo.findSdkById(schoolId, id);
    if (!item) throw new EntSdkNotFoundError(id);
    return item;
  }
  async listSdks(schoolId: string, filters?: Record<string, unknown>): Promise<SDK[]> {
    return this.repo.findAllSdks(schoolId, filters);
  }
  async createSdk(schoolId: string, data: SDKCreate): Promise<SDK> {
    return this.repo.createSdk(schoolId, data);
  }
  async updateSdk(schoolId: string, id: string, data: Partial<SDKCreate>): Promise<SDK> {
    const existing = await this.repo.findSdkById(schoolId, id);
    if (!existing) throw new EntSdkNotFoundError(id);
    return this.repo.updateSdk(schoolId, id, data);
  }
  async deleteSdk(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSdkById(schoolId, id);
    if (!existing) throw new EntSdkNotFoundError(id);
    return this.repo.deleteSdk(schoolId, id);
  }
  async countSdks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSdks(schoolId, filters);
  }
}
