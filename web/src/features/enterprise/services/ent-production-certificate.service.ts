// Enterprise Platform Service - ProductionCertificate
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductionCertificate, ProductionCertificateCreate } from '@educi/types';
import { EntProductionCertificateNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProductionCertificateService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProductionCertificate(schoolId: string, id: string): Promise<ProductionCertificate> {
    const item = await this.repo.findProductionCertificateById(schoolId, id);
    if (!item) throw new EntProductionCertificateNotFoundError(id);
    return item;
  }
  async listProductionCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<ProductionCertificate[]> {
    return this.repo.findAllProductionCertificates(schoolId, filters);
  }
  async createProductionCertificate(schoolId: string, data: ProductionCertificateCreate): Promise<ProductionCertificate> {
    return this.repo.createProductionCertificate(schoolId, data);
  }
  async updateProductionCertificate(schoolId: string, id: string, data: Partial<ProductionCertificateCreate>): Promise<ProductionCertificate> {
    const existing = await this.repo.findProductionCertificateById(schoolId, id);
    if (!existing) throw new EntProductionCertificateNotFoundError(id);
    return this.repo.updateProductionCertificate(schoolId, id, data);
  }
  async deleteProductionCertificate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProductionCertificateById(schoolId, id);
    if (!existing) throw new EntProductionCertificateNotFoundError(id);
    return this.repo.deleteProductionCertificate(schoolId, id);
  }
  async countProductionCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProductionCertificates(schoolId, filters);
  }
}
