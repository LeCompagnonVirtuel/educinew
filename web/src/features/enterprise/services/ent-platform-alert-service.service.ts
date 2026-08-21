// Enterprise Platform Service - PlatformAlert
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformAlert, PlatformAlertCreate } from '@educi/types';
import { EntPlatformAlertNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformAlertServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformAlertService(schoolId: string, id: string): Promise<PlatformAlert> {
    const item = await this.repo.findPlatformAlertServiceById(schoolId, id);
    if (!item) throw new EntPlatformAlertNotFoundError(id);
    return item;
  }
  async listPlatformAlertServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformAlert[]> {
    return this.repo.findAllPlatformAlertServices(schoolId, filters);
  }
  async createPlatformAlertService(schoolId: string, data: PlatformAlertCreate): Promise<PlatformAlert> {
    return this.repo.createPlatformAlertService(schoolId, data);
  }
  async updatePlatformAlertService(schoolId: string, id: string, data: Partial<PlatformAlertCreate>): Promise<PlatformAlert> {
    const existing = await this.repo.findPlatformAlertServiceById(schoolId, id);
    if (!existing) throw new EntPlatformAlertNotFoundError(id);
    return this.repo.updatePlatformAlertService(schoolId, id, data);
  }
  async deletePlatformAlertService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformAlertServiceById(schoolId, id);
    if (!existing) throw new EntPlatformAlertNotFoundError(id);
    return this.repo.deletePlatformAlertService(schoolId, id);
  }
  async countPlatformAlertServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformAlertServices(schoolId, filters);
  }
}
