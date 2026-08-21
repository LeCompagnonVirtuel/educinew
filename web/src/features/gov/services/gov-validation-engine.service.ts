// Government & National Governance Service - ValidationEngine
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ValidationEngine, ValidationEngineCreate } from '@educi/types';
import { GovValidationEngineNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovValidationEngineService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getValidationEngine(schoolId: string, id: string): Promise<ValidationEngine> {
    const item = await this.repo.findValidationEngineById(schoolId, id);
    if (!item) throw new GovValidationEngineNotFoundError(id);
    return item;
  }

  async listValidationEngines(schoolId: string, filters?: Record<string, unknown>): Promise<ValidationEngine[]> {
    return this.repo.findAllValidationEngines(schoolId, filters);
  }

  async createValidationEngine(schoolId: string, data: ValidationEngineCreate): Promise<ValidationEngine> {
    return this.repo.createValidationEngine(schoolId, data);
  }

  async updateValidationEngine(schoolId: string, id: string, data: Partial<ValidationEngineCreate>): Promise<ValidationEngine> {
    const existing = await this.repo.findValidationEngineById(schoolId, id);
    if (!existing) throw new GovValidationEngineNotFoundError(id);
    return this.repo.updateValidationEngine(schoolId, id, data);
  }

  async deleteValidationEngine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findValidationEngineById(schoolId, id);
    if (!existing) throw new GovValidationEngineNotFoundError(id);
    return this.repo.deleteValidationEngine(schoolId, id);
  }

  async countValidationEngines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countValidationEngines(schoolId, filters);
  }
}
