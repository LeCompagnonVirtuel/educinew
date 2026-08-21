// Enterprise Platform Service - SLAMonitor
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SLAMonitor, SLAMonitorCreate } from '@educi/types';
import { EntSLAMonitorNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSLAMonitorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSLAMonitor(schoolId: string, id: string): Promise<SLAMonitor> {
    const item = await this.repo.findSLAMonitorById(schoolId, id);
    if (!item) throw new EntSLAMonitorNotFoundError(id);
    return item;
  }
  async listSLAMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<SLAMonitor[]> {
    return this.repo.findAllSLAMonitors(schoolId, filters);
  }
  async createSLAMonitor(schoolId: string, data: SLAMonitorCreate): Promise<SLAMonitor> {
    return this.repo.createSLAMonitor(schoolId, data);
  }
  async updateSLAMonitor(schoolId: string, id: string, data: Partial<SLAMonitorCreate>): Promise<SLAMonitor> {
    const existing = await this.repo.findSLAMonitorById(schoolId, id);
    if (!existing) throw new EntSLAMonitorNotFoundError(id);
    return this.repo.updateSLAMonitor(schoolId, id, data);
  }
  async deleteSLAMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSLAMonitorById(schoolId, id);
    if (!existing) throw new EntSLAMonitorNotFoundError(id);
    return this.repo.deleteSLAMonitor(schoolId, id);
  }
  async countSLAMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSLAMonitors(schoolId, filters);
  }
}
