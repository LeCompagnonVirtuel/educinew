// Enterprise Platform Service - ProductionHealthCheck
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductionHealthCheck, ProductionHealthCheckCreate } from '@educi/types';
import { EntProductionHealthCheckNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProductionHealthCheckService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProductionHealthCheck(schoolId: string, id: string): Promise<ProductionHealthCheck> {
    const item = await this.repo.findProductionHealthCheckById(schoolId, id);
    if (!item) throw new EntProductionHealthCheckNotFoundError(id);
    return item;
  }
  async listProductionHealthChecks(schoolId: string, filters?: Record<string, unknown>): Promise<ProductionHealthCheck[]> {
    return this.repo.findAllProductionHealthChecks(schoolId, filters);
  }
  async createProductionHealthCheck(schoolId: string, data: ProductionHealthCheckCreate): Promise<ProductionHealthCheck> {
    return this.repo.createProductionHealthCheck(schoolId, data);
  }
  async updateProductionHealthCheck(schoolId: string, id: string, data: Partial<ProductionHealthCheckCreate>): Promise<ProductionHealthCheck> {
    const existing = await this.repo.findProductionHealthCheckById(schoolId, id);
    if (!existing) throw new EntProductionHealthCheckNotFoundError(id);
    return this.repo.updateProductionHealthCheck(schoolId, id, data);
  }
  async deleteProductionHealthCheck(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProductionHealthCheckById(schoolId, id);
    if (!existing) throw new EntProductionHealthCheckNotFoundError(id);
    return this.repo.deleteProductionHealthCheck(schoolId, id);
  }
  async countProductionHealthChecks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProductionHealthChecks(schoolId, filters);
  }
}
