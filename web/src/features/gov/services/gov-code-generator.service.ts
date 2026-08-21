// Government & National Governance Service - CodeGenerator
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CodeGenerator, CodeGeneratorCreate } from '@educi/types';
import { GovCodeGeneratorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCodeGeneratorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCodeGenerator(schoolId: string, id: string): Promise<CodeGenerator> {
    const item = await this.repo.findCodeGeneratorById(schoolId, id);
    if (!item) throw new GovCodeGeneratorNotFoundError(id);
    return item;
  }

  async listCodeGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<CodeGenerator[]> {
    return this.repo.findAllCodeGenerators(schoolId, filters);
  }

  async createCodeGenerator(schoolId: string, data: CodeGeneratorCreate): Promise<CodeGenerator> {
    return this.repo.createCodeGenerator(schoolId, data);
  }

  async updateCodeGenerator(schoolId: string, id: string, data: Partial<CodeGeneratorCreate>): Promise<CodeGenerator> {
    const existing = await this.repo.findCodeGeneratorById(schoolId, id);
    if (!existing) throw new GovCodeGeneratorNotFoundError(id);
    return this.repo.updateCodeGenerator(schoolId, id, data);
  }

  async deleteCodeGenerator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCodeGeneratorById(schoolId, id);
    if (!existing) throw new GovCodeGeneratorNotFoundError(id);
    return this.repo.deleteCodeGenerator(schoolId, id);
  }

  async countCodeGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCodeGenerators(schoolId, filters);
  }
}
