// Enterprise Platform Service - APIDocumentation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { APIDocumentation, APIDocumentationCreate } from '@educi/types';
import { EntApiDocumentationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntApiDocumentationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getApiDocumentation(schoolId: string, id: string): Promise<APIDocumentation> {
    const item = await this.repo.findApiDocumentationById(schoolId, id);
    if (!item) throw new EntApiDocumentationNotFoundError(id);
    return item;
  }
  async listApiDocumentations(schoolId: string, filters?: Record<string, unknown>): Promise<APIDocumentation[]> {
    return this.repo.findAllApiDocumentations(schoolId, filters);
  }
  async createApiDocumentation(schoolId: string, data: APIDocumentationCreate): Promise<APIDocumentation> {
    return this.repo.createApiDocumentation(schoolId, data);
  }
  async updateApiDocumentation(schoolId: string, id: string, data: Partial<APIDocumentationCreate>): Promise<APIDocumentation> {
    const existing = await this.repo.findApiDocumentationById(schoolId, id);
    if (!existing) throw new EntApiDocumentationNotFoundError(id);
    return this.repo.updateApiDocumentation(schoolId, id, data);
  }
  async deleteApiDocumentation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findApiDocumentationById(schoolId, id);
    if (!existing) throw new EntApiDocumentationNotFoundError(id);
    return this.repo.deleteApiDocumentation(schoolId, id);
  }
  async countApiDocumentations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countApiDocumentations(schoolId, filters);
  }
}
