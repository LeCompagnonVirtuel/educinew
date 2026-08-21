// Enterprise Platform Service - APIDocGenerator
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { APIDocGenerator, APIDocGeneratorCreate } from '@educi/types';
import { EntAPIDocGeneratorNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAPIDocGeneratorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAPIDocGenerator(schoolId: string, id: string): Promise<APIDocGenerator> {
    const item = await this.repo.findAPIDocGeneratorById(schoolId, id);
    if (!item) throw new EntAPIDocGeneratorNotFoundError(id);
    return item;
  }
  async listAPIDocGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<APIDocGenerator[]> {
    return this.repo.findAllAPIDocGenerators(schoolId, filters);
  }
  async createAPIDocGenerator(schoolId: string, data: APIDocGeneratorCreate): Promise<APIDocGenerator> {
    return this.repo.createAPIDocGenerator(schoolId, data);
  }
  async updateAPIDocGenerator(schoolId: string, id: string, data: Partial<APIDocGeneratorCreate>): Promise<APIDocGenerator> {
    const existing = await this.repo.findAPIDocGeneratorById(schoolId, id);
    if (!existing) throw new EntAPIDocGeneratorNotFoundError(id);
    return this.repo.updateAPIDocGenerator(schoolId, id, data);
  }
  async deleteAPIDocGenerator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAPIDocGeneratorById(schoolId, id);
    if (!existing) throw new EntAPIDocGeneratorNotFoundError(id);
    return this.repo.deleteAPIDocGenerator(schoolId, id);
  }
  async countAPIDocGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAPIDocGenerators(schoolId, filters);
  }
}
