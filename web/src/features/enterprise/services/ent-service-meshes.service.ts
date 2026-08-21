// Enterprise Platform Service - ServiceMeshes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntServiceMeshService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getServiceMeshe(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findServiceMesheById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listServiceMeshes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllServiceMeshes(schoolId, filters);
  }
  async createServiceMeshe(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createServiceMeshe(schoolId, data);
  }
  async updateServiceMeshe(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findServiceMesheById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateServiceMeshe(schoolId, id, data);
  }
  async deleteServiceMeshe(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findServiceMesheById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteServiceMeshe(schoolId, id);
  }
  async countServiceMeshes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countServiceMeshes(schoolId, filters);
  }
}
