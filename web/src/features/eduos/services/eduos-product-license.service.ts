import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductLicense } from '@educi/types';
import { EduOSProductLicenseError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSProductLicenseService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getProductLicense(schoolId: string, id: string): Promise<ProductLicense> {
    const item = await this.repo.getProductLicense(schoolId, id);
    if (!item) throw new EduOSProductLicenseError(id);
    return item;
  }
  async listProductLicenses(schoolId: string, filters?: Record<string, unknown>): Promise<ProductLicense[]> {
    return this.repo.listProductLicenses(schoolId, filters);
  }
  async createProductLicense(schoolId: string, data: Partial<ProductLicense>): Promise<ProductLicense> {
    return this.repo.createProductLicense(schoolId, data as any);
  }
  async updateProductLicense(schoolId: string, id: string, data: Partial<ProductLicense>): Promise<ProductLicense> {
    const existing = await this.repo.getProductLicense(schoolId, id);
    if (!existing) throw new EduOSProductLicenseError(id);
    return this.repo.updateProductLicense(schoolId, id, data as any);
  }
  async deleteProductLicense(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProductLicense(schoolId, id);
    if (!existing) throw new EduOSProductLicenseError(id);
    return this.repo.deleteProductLicense(schoolId, id);
  }
}

