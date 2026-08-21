// Enterprise Platform Service - AlertDispatch
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AlertDispatch, AlertDispatchCreate } from '@educi/types';
import { EntAlertDispatchNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAlertDispatchService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAlertDispatch(schoolId: string, id: string): Promise<AlertDispatch> {
    const item = await this.repo.findAlertDispatchById(schoolId, id);
    if (!item) throw new EntAlertDispatchNotFoundError(id);
    return item;
  }
  async listAlertDispatchs(schoolId: string, filters?: Record<string, unknown>): Promise<AlertDispatch[]> {
    return this.repo.findAllAlertDispatchs(schoolId, filters);
  }
  async createAlertDispatch(schoolId: string, data: AlertDispatchCreate): Promise<AlertDispatch> {
    return this.repo.createAlertDispatch(schoolId, data);
  }
  async updateAlertDispatch(schoolId: string, id: string, data: Partial<AlertDispatchCreate>): Promise<AlertDispatch> {
    const existing = await this.repo.findAlertDispatchById(schoolId, id);
    if (!existing) throw new EntAlertDispatchNotFoundError(id);
    return this.repo.updateAlertDispatch(schoolId, id, data);
  }
  async deleteAlertDispatch(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAlertDispatchById(schoolId, id);
    if (!existing) throw new EntAlertDispatchNotFoundError(id);
    return this.repo.deleteAlertDispatch(schoolId, id);
  }
  async countAlertDispatchs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAlertDispatchs(schoolId, filters);
  }
}
