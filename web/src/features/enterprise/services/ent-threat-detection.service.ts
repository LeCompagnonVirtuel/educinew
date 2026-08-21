// Enterprise Platform Service - ThreatDetection
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ThreatDetection, ThreatDetectionCreate } from '@educi/types';
import { EntThreatDetectionNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntThreatDetectionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getThreatDetection(schoolId: string, id: string): Promise<ThreatDetection> {
    const item = await this.repo.findThreatDetectionById(schoolId, id);
    if (!item) throw new EntThreatDetectionNotFoundError(id);
    return item;
  }
  async listThreatDetections(schoolId: string, filters?: Record<string, unknown>): Promise<ThreatDetection[]> {
    return this.repo.findAllThreatDetections(schoolId, filters);
  }
  async createThreatDetection(schoolId: string, data: ThreatDetectionCreate): Promise<ThreatDetection> {
    return this.repo.createThreatDetection(schoolId, data);
  }
  async updateThreatDetection(schoolId: string, id: string, data: Partial<ThreatDetectionCreate>): Promise<ThreatDetection> {
    const existing = await this.repo.findThreatDetectionById(schoolId, id);
    if (!existing) throw new EntThreatDetectionNotFoundError(id);
    return this.repo.updateThreatDetection(schoolId, id, data);
  }
  async deleteThreatDetection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findThreatDetectionById(schoolId, id);
    if (!existing) throw new EntThreatDetectionNotFoundError(id);
    return this.repo.deleteThreatDetection(schoolId, id);
  }
  async countThreatDetections(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countThreatDetections(schoolId, filters);
  }
}
