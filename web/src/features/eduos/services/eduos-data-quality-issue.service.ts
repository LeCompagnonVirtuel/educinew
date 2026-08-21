import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataQualityIssue } from '@educi/types';
import { EduOSDataQualityIssueError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataQualityIssueService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataQualityIssue(schoolId: string, id: string): Promise<DataQualityIssue> {
    const item = await this.repo.getDataQualityIssue(schoolId, id);
    if (!item) throw new EduOSDataQualityIssueError(id);
    return item;
  }
  async listDataQualityIssues(schoolId: string, filters?: Record<string, unknown>): Promise<DataQualityIssue[]> {
    return this.repo.listDataQualityIssues(schoolId, filters);
  }
  async createDataQualityIssue(schoolId: string, data: Partial<DataQualityIssue>): Promise<DataQualityIssue> {
    return this.repo.createDataQualityIssue(schoolId, data as any);
  }
  async updateDataQualityIssue(schoolId: string, id: string, data: Partial<DataQualityIssue>): Promise<DataQualityIssue> {
    const existing = await this.repo.getDataQualityIssue(schoolId, id);
    if (!existing) throw new EduOSDataQualityIssueError(id);
    return this.repo.updateDataQualityIssue(schoolId, id, data as any);
  }
  async deleteDataQualityIssue(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataQualityIssue(schoolId, id);
    if (!existing) throw new EduOSDataQualityIssueError(id);
    return this.repo.deleteDataQualityIssue(schoolId, id);
  }
}

