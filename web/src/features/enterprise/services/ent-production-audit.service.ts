// Enterprise Platform Service - ProductionAudit
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductionAudit, ProductionAuditCreate } from '@educi/types';
import { EntProductionAuditNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProductionAuditService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProductionAudit(schoolId: string, id: string): Promise<ProductionAudit> {
    const item = await this.repo.findProductionAuditById(schoolId, id);
    if (!item) throw new EntProductionAuditNotFoundError(id);
    return item;
  }
  async listProductionAudits(schoolId: string, filters?: Record<string, unknown>): Promise<ProductionAudit[]> {
    return this.repo.findAllProductionAudits(schoolId, filters);
  }
  async createProductionAudit(schoolId: string, data: ProductionAuditCreate): Promise<ProductionAudit> {
    return this.repo.createProductionAudit(schoolId, data);
  }
  async updateProductionAudit(schoolId: string, id: string, data: Partial<ProductionAuditCreate>): Promise<ProductionAudit> {
    const existing = await this.repo.findProductionAuditById(schoolId, id);
    if (!existing) throw new EntProductionAuditNotFoundError(id);
    return this.repo.updateProductionAudit(schoolId, id, data);
  }
  async deleteProductionAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProductionAuditById(schoolId, id);
    if (!existing) throw new EntProductionAuditNotFoundError(id);
    return this.repo.deleteProductionAudit(schoolId, id);
  }
  async countProductionAudits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProductionAudits(schoolId, filters);
  }
}
