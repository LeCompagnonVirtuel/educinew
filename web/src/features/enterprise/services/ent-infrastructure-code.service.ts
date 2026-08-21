// Enterprise Platform Service - InfrastructureCode
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InfrastructureCode, InfrastructureCodeCreate } from '@educi/types';
import { EntInfrastructureCodeNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntInfrastructureCodeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getInfrastructureCode(schoolId: string, id: string): Promise<InfrastructureCode> {
    const item = await this.repo.findInfrastructureCodeById(schoolId, id);
    if (!item) throw new EntInfrastructureCodeNotFoundError(id);
    return item;
  }
  async listInfrastructureCodes(schoolId: string, filters?: Record<string, unknown>): Promise<InfrastructureCode[]> {
    return this.repo.findAllInfrastructureCodes(schoolId, filters);
  }
  async createInfrastructureCode(schoolId: string, data: InfrastructureCodeCreate): Promise<InfrastructureCode> {
    return this.repo.createInfrastructureCode(schoolId, data);
  }
  async updateInfrastructureCode(schoolId: string, id: string, data: Partial<InfrastructureCodeCreate>): Promise<InfrastructureCode> {
    const existing = await this.repo.findInfrastructureCodeById(schoolId, id);
    if (!existing) throw new EntInfrastructureCodeNotFoundError(id);
    return this.repo.updateInfrastructureCode(schoolId, id, data);
  }
  async deleteInfrastructureCode(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInfrastructureCodeById(schoolId, id);
    if (!existing) throw new EntInfrastructureCodeNotFoundError(id);
    return this.repo.deleteInfrastructureCode(schoolId, id);
  }
  async countInfrastructureCodes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInfrastructureCodes(schoolId, filters);
  }
}
