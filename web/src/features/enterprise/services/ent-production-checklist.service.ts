// Enterprise Platform Service - ProductionChecklist
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductionChecklist, ProductionChecklistCreate } from '@educi/types';
import { EntProductionChecklistNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProductionChecklistService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProductionChecklist(schoolId: string, id: string): Promise<ProductionChecklist> {
    const item = await this.repo.findProductionChecklistById(schoolId, id);
    if (!item) throw new EntProductionChecklistNotFoundError(id);
    return item;
  }
  async listProductionChecklists(schoolId: string, filters?: Record<string, unknown>): Promise<ProductionChecklist[]> {
    return this.repo.findAllProductionChecklists(schoolId, filters);
  }
  async createProductionChecklist(schoolId: string, data: ProductionChecklistCreate): Promise<ProductionChecklist> {
    return this.repo.createProductionChecklist(schoolId, data);
  }
  async updateProductionChecklist(schoolId: string, id: string, data: Partial<ProductionChecklistCreate>): Promise<ProductionChecklist> {
    const existing = await this.repo.findProductionChecklistById(schoolId, id);
    if (!existing) throw new EntProductionChecklistNotFoundError(id);
    return this.repo.updateProductionChecklist(schoolId, id, data);
  }
  async deleteProductionChecklist(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProductionChecklistById(schoolId, id);
    if (!existing) throw new EntProductionChecklistNotFoundError(id);
    return this.repo.deleteProductionChecklist(schoolId, id);
  }
  async countProductionChecklists(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProductionChecklists(schoolId, filters);
  }
}
