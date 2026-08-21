// Enterprise Platform Service - MaintenanceWindows
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMaintenanceWindowService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMaintenanceWindow(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMaintenanceWindowById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMaintenanceWindows(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMaintenanceWindows(schoolId, filters);
  }
  async createMaintenanceWindow(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMaintenanceWindow(schoolId, data);
  }
  async updateMaintenanceWindow(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMaintenanceWindowById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMaintenanceWindow(schoolId, id, data);
  }
  async deleteMaintenanceWindow(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMaintenanceWindowById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMaintenanceWindow(schoolId, id);
  }
  async countMaintenanceWindows(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMaintenanceWindows(schoolId, filters);
  }
}
