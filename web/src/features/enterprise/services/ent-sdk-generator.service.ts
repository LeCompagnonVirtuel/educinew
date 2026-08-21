// Enterprise Platform Service - SDKGenerator
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SDKGenerator, SDKGeneratorCreate } from '@educi/types';
import { EntSDKGeneratorNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSDKGeneratorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSDKGenerator(schoolId: string, id: string): Promise<SDKGenerator> {
    const item = await this.repo.findSDKGeneratorById(schoolId, id);
    if (!item) throw new EntSDKGeneratorNotFoundError(id);
    return item;
  }
  async listSDKGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<SDKGenerator[]> {
    return this.repo.findAllSDKGenerators(schoolId, filters);
  }
  async createSDKGenerator(schoolId: string, data: SDKGeneratorCreate): Promise<SDKGenerator> {
    return this.repo.createSDKGenerator(schoolId, data);
  }
  async updateSDKGenerator(schoolId: string, id: string, data: Partial<SDKGeneratorCreate>): Promise<SDKGenerator> {
    const existing = await this.repo.findSDKGeneratorById(schoolId, id);
    if (!existing) throw new EntSDKGeneratorNotFoundError(id);
    return this.repo.updateSDKGenerator(schoolId, id, data);
  }
  async deleteSDKGenerator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSDKGeneratorById(schoolId, id);
    if (!existing) throw new EntSDKGeneratorNotFoundError(id);
    return this.repo.deleteSDKGenerator(schoolId, id);
  }
  async countSDKGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSDKGenerators(schoolId, filters);
  }
}
