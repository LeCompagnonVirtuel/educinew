// Enterprise Platform Service - PlatformSetting
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformSetting, PlatformSettingCreate } from '@educi/types';
import { EntPlatformSettingNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformSettingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformSetting(schoolId: string, id: string): Promise<PlatformSetting> {
    const item = await this.repo.findPlatformSettingById(schoolId, id);
    if (!item) throw new EntPlatformSettingNotFoundError(id);
    return item;
  }
  async listPlatformSettings(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformSetting[]> {
    return this.repo.findAllPlatformSettings(schoolId, filters);
  }
  async createPlatformSetting(schoolId: string, data: PlatformSettingCreate): Promise<PlatformSetting> {
    return this.repo.createPlatformSetting(schoolId, data);
  }
  async updatePlatformSetting(schoolId: string, id: string, data: Partial<PlatformSettingCreate>): Promise<PlatformSetting> {
    const existing = await this.repo.findPlatformSettingById(schoolId, id);
    if (!existing) throw new EntPlatformSettingNotFoundError(id);
    return this.repo.updatePlatformSetting(schoolId, id, data);
  }
  async deletePlatformSetting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformSettingById(schoolId, id);
    if (!existing) throw new EntPlatformSettingNotFoundError(id);
    return this.repo.deletePlatformSetting(schoolId, id);
  }
  async countPlatformSettings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformSettings(schoolId, filters);
  }
}
