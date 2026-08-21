// Enterprise Platform Service - MetadataCatalog
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MetadataCatalog, MetadataCatalogCreate } from '@educi/types';
import { EntMetadataCatalogNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMetadataCatalogService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMetadataCatalog(schoolId: string, id: string): Promise<MetadataCatalog> {
    const item = await this.repo.findMetadataCatalogById(schoolId, id);
    if (!item) throw new EntMetadataCatalogNotFoundError(id);
    return item;
  }
  async listMetadataCatalogs(schoolId: string, filters?: Record<string, unknown>): Promise<MetadataCatalog[]> {
    return this.repo.findAllMetadataCatalogs(schoolId, filters);
  }
  async createMetadataCatalog(schoolId: string, data: MetadataCatalogCreate): Promise<MetadataCatalog> {
    return this.repo.createMetadataCatalog(schoolId, data);
  }
  async updateMetadataCatalog(schoolId: string, id: string, data: Partial<MetadataCatalogCreate>): Promise<MetadataCatalog> {
    const existing = await this.repo.findMetadataCatalogById(schoolId, id);
    if (!existing) throw new EntMetadataCatalogNotFoundError(id);
    return this.repo.updateMetadataCatalog(schoolId, id, data);
  }
  async deleteMetadataCatalog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMetadataCatalogById(schoolId, id);
    if (!existing) throw new EntMetadataCatalogNotFoundError(id);
    return this.repo.deleteMetadataCatalog(schoolId, id);
  }
  async countMetadataCatalogs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMetadataCatalogs(schoolId, filters);
  }
}
