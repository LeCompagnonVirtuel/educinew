// Enterprise Platform Service - SDKExample
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SDKExample, SDKExampleCreate } from '@educi/types';
import { EntSdkExampleNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSdkExampleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSdkExample(schoolId: string, id: string): Promise<SDKExample> {
    const item = await this.repo.findSdkExampleById(schoolId, id);
    if (!item) throw new EntSdkExampleNotFoundError(id);
    return item;
  }
  async listSdkExamples(schoolId: string, filters?: Record<string, unknown>): Promise<SDKExample[]> {
    return this.repo.findAllSdkExamples(schoolId, filters);
  }
  async createSdkExample(schoolId: string, data: SDKExampleCreate): Promise<SDKExample> {
    return this.repo.createSdkExample(schoolId, data);
  }
  async updateSdkExample(schoolId: string, id: string, data: Partial<SDKExampleCreate>): Promise<SDKExample> {
    const existing = await this.repo.findSdkExampleById(schoolId, id);
    if (!existing) throw new EntSdkExampleNotFoundError(id);
    return this.repo.updateSdkExample(schoolId, id, data);
  }
  async deleteSdkExample(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSdkExampleById(schoolId, id);
    if (!existing) throw new EntSdkExampleNotFoundError(id);
    return this.repo.deleteSdkExample(schoolId, id);
  }
  async countSdkExamples(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSdkExamples(schoolId, filters);
  }
}
