// Enterprise Platform Service - ProductionMonitor
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductionMonitor, ProductionMonitorCreate } from '@educi/types';
import { EntProductionMonitorNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProductionMonitorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProductionMonitor(schoolId: string, id: string): Promise<ProductionMonitor> {
    const item = await this.repo.findProductionMonitorById(schoolId, id);
    if (!item) throw new EntProductionMonitorNotFoundError(id);
    return item;
  }
  async listProductionMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<ProductionMonitor[]> {
    return this.repo.findAllProductionMonitors(schoolId, filters);
  }
  async createProductionMonitor(schoolId: string, data: ProductionMonitorCreate): Promise<ProductionMonitor> {
    return this.repo.createProductionMonitor(schoolId, data);
  }
  async updateProductionMonitor(schoolId: string, id: string, data: Partial<ProductionMonitorCreate>): Promise<ProductionMonitor> {
    const existing = await this.repo.findProductionMonitorById(schoolId, id);
    if (!existing) throw new EntProductionMonitorNotFoundError(id);
    return this.repo.updateProductionMonitor(schoolId, id, data);
  }
  async deleteProductionMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProductionMonitorById(schoolId, id);
    if (!existing) throw new EntProductionMonitorNotFoundError(id);
    return this.repo.deleteProductionMonitor(schoolId, id);
  }
  async countProductionMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProductionMonitors(schoolId, filters);
  }
}
