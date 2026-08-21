// Enterprise Platform Service - ProductionRunbook
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductionRunbook, ProductionRunbookCreate } from '@educi/types';
import { EntProductionRunbookNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProductionRunbookService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProductionRunbook(schoolId: string, id: string): Promise<ProductionRunbook> {
    const item = await this.repo.findProductionRunbookById(schoolId, id);
    if (!item) throw new EntProductionRunbookNotFoundError(id);
    return item;
  }
  async listProductionRunbooks(schoolId: string, filters?: Record<string, unknown>): Promise<ProductionRunbook[]> {
    return this.repo.findAllProductionRunbooks(schoolId, filters);
  }
  async createProductionRunbook(schoolId: string, data: ProductionRunbookCreate): Promise<ProductionRunbook> {
    return this.repo.createProductionRunbook(schoolId, data);
  }
  async updateProductionRunbook(schoolId: string, id: string, data: Partial<ProductionRunbookCreate>): Promise<ProductionRunbook> {
    const existing = await this.repo.findProductionRunbookById(schoolId, id);
    if (!existing) throw new EntProductionRunbookNotFoundError(id);
    return this.repo.updateProductionRunbook(schoolId, id, data);
  }
  async deleteProductionRunbook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProductionRunbookById(schoolId, id);
    if (!existing) throw new EntProductionRunbookNotFoundError(id);
    return this.repo.deleteProductionRunbook(schoolId, id);
  }
  async countProductionRunbooks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProductionRunbooks(schoolId, filters);
  }
}
