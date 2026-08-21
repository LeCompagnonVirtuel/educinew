// Enterprise Platform Service - PlatformSetting
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformSetting, PlatformSettingCreate } from '@educi/types';
import { EntPlatformSettingNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformSettingServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformSettingService(schoolId: string, id: string): Promise<PlatformSetting> {
    const item = await this.repo.findPlatformSettingServiceById(schoolId, id);
    if (!item) throw new EntPlatformSettingNotFoundError(id);
    return item;
  }
  async listPlatformSettingServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformSetting[]> {
    return this.repo.findAllPlatformSettingServices(schoolId, filters);
  }
  async createPlatformSettingService(schoolId: string, data: PlatformSettingCreate): Promise<PlatformSetting> {
    return this.repo.createPlatformSettingService(schoolId, data);
  }
  async updatePlatformSettingService(schoolId: string, id: string, data: Partial<PlatformSettingCreate>): Promise<PlatformSetting> {
    const existing = await this.repo.findPlatformSettingServiceById(schoolId, id);
    if (!existing) throw new EntPlatformSettingNotFoundError(id);
    return this.repo.updatePlatformSettingService(schoolId, id, data);
  }
  async deletePlatformSettingService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformSettingServiceById(schoolId, id);
    if (!existing) throw new EntPlatformSettingNotFoundError(id);
    return this.repo.deletePlatformSettingService(schoolId, id);
  }
  async countPlatformSettingServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformSettingServices(schoolId, filters);
  }
}
