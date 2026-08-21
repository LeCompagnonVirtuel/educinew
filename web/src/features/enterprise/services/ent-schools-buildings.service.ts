// Enterprise Platform Service - SchoolsBuildings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchoolBuildingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchoolsBuilding(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSchoolsBuildingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSchoolsBuildings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSchoolsBuildings(schoolId, filters);
  }
  async createSchoolsBuilding(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSchoolsBuilding(schoolId, data);
  }
  async updateSchoolsBuilding(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSchoolsBuildingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSchoolsBuilding(schoolId, id, data);
  }
  async deleteSchoolsBuilding(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolsBuildingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSchoolsBuilding(schoolId, id);
  }
  async countSchoolsBuildings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolsBuildings(schoolId, filters);
  }
}
