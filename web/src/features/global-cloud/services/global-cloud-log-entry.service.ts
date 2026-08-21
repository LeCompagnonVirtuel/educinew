import type { SupabaseClient } from '@supabase/supabase-js';
import type { LogEntry } from '@educi/types';
import { EduCloudLogEntryError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudLogEntry {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getLogEntry(schoolId: string, id: string): Promise<LogEntry> {
    const item = await this.repo.getLogEntry(schoolId, id);
    if (!item) throw new EduCloudLogEntryError(id);
    return item;
  }
  async listLogEntrys(schoolId: string, filters?: Record<string, unknown>): Promise<LogEntry[]> {
    return this.repo.listLogEntry(schoolId, filters);
  }
  async createLogEntry(schoolId: string, data: Partial<LogEntry>): Promise<LogEntry> {
    return this.repo.createLogEntry(schoolId, data as any);
  }
  async updateLogEntry(schoolId: string, id: string, data: Partial<LogEntry>): Promise<LogEntry> {
    const existing = await this.repo.getLogEntry(schoolId, id);
    if (!existing) throw new EduCloudLogEntryError(id);
    return this.repo.updateLogEntry(schoolId, id, data as any);
  }
  async deleteLogEntry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLogEntry(schoolId, id);
    if (!existing) throw new EduCloudLogEntryError(id);
    return this.repo.deleteLogEntry(schoolId, id);
  }
}
