// Enterprise Platform Service - PlatformAlert
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformAlert, PlatformAlertCreate } from '@educi/types';
import { EntPlatformAlertNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformAlertService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformAlert(schoolId: string, id: string): Promise<PlatformAlert> {
    const item = await this.repo.findPlatformAlertById(schoolId, id);
    if (!item) throw new EntPlatformAlertNotFoundError(id);
    return item;
  }
  async listPlatformAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformAlert[]> {
    return this.repo.findAllPlatformAlerts(schoolId, filters);
  }
  async createPlatformAlert(schoolId: string, data: PlatformAlertCreate): Promise<PlatformAlert> {
    return this.repo.createPlatformAlert(schoolId, data);
  }
  async updatePlatformAlert(schoolId: string, id: string, data: Partial<PlatformAlertCreate>): Promise<PlatformAlert> {
    const existing = await this.repo.findPlatformAlertById(schoolId, id);
    if (!existing) throw new EntPlatformAlertNotFoundError(id);
    return this.repo.updatePlatformAlert(schoolId, id, data);
  }
  async deletePlatformAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformAlertById(schoolId, id);
    if (!existing) throw new EntPlatformAlertNotFoundError(id);
    return this.repo.deletePlatformAlert(schoolId, id);
  }
  async countPlatformAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformAlerts(schoolId, filters);
  }
}
