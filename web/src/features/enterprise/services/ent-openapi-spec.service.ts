// Enterprise Platform Service - OpenAPISpec
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { OpenAPISpec, OpenAPISpecCreate } from '@educi/types';
import { EntOpenApiSpecNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntOpenApiSpecService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getOpenApiSpec(schoolId: string, id: string): Promise<OpenAPISpec> {
    const item = await this.repo.findOpenApiSpecById(schoolId, id);
    if (!item) throw new EntOpenApiSpecNotFoundError(id);
    return item;
  }
  async listOpenApiSpecs(schoolId: string, filters?: Record<string, unknown>): Promise<OpenAPISpec[]> {
    return this.repo.findAllOpenApiSpecs(schoolId, filters);
  }
  async createOpenApiSpec(schoolId: string, data: OpenAPISpecCreate): Promise<OpenAPISpec> {
    return this.repo.createOpenApiSpec(schoolId, data);
  }
  async updateOpenApiSpec(schoolId: string, id: string, data: Partial<OpenAPISpecCreate>): Promise<OpenAPISpec> {
    const existing = await this.repo.findOpenApiSpecById(schoolId, id);
    if (!existing) throw new EntOpenApiSpecNotFoundError(id);
    return this.repo.updateOpenApiSpec(schoolId, id, data);
  }
  async deleteOpenApiSpec(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findOpenApiSpecById(schoolId, id);
    if (!existing) throw new EntOpenApiSpecNotFoundError(id);
    return this.repo.deleteOpenApiSpec(schoolId, id);
  }
  async countOpenApiSpecs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countOpenApiSpecs(schoolId, filters);
  }
}
