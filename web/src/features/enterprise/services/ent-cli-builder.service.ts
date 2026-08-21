// Enterprise Platform Service - CLIBuilder
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CLIBuilder, CLIBuilderCreate } from '@educi/types';
import { EntCLIBuilderNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCLIBuilderService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCLIBuilder(schoolId: string, id: string): Promise<CLIBuilder> {
    const item = await this.repo.findCLIBuilderById(schoolId, id);
    if (!item) throw new EntCLIBuilderNotFoundError(id);
    return item;
  }
  async listCLIBuilders(schoolId: string, filters?: Record<string, unknown>): Promise<CLIBuilder[]> {
    return this.repo.findAllCLIBuilders(schoolId, filters);
  }
  async createCLIBuilder(schoolId: string, data: CLIBuilderCreate): Promise<CLIBuilder> {
    return this.repo.createCLIBuilder(schoolId, data);
  }
  async updateCLIBuilder(schoolId: string, id: string, data: Partial<CLIBuilderCreate>): Promise<CLIBuilder> {
    const existing = await this.repo.findCLIBuilderById(schoolId, id);
    if (!existing) throw new EntCLIBuilderNotFoundError(id);
    return this.repo.updateCLIBuilder(schoolId, id, data);
  }
  async deleteCLIBuilder(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCLIBuilderById(schoolId, id);
    if (!existing) throw new EntCLIBuilderNotFoundError(id);
    return this.repo.deleteCLIBuilder(schoolId, id);
  }
  async countCLIBuilders(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCLIBuilders(schoolId, filters);
  }
}
