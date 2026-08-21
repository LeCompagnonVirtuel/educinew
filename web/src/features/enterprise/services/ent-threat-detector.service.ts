// Enterprise Platform Service - ThreatDetector
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ThreatDetector, ThreatDetectorCreate } from '@educi/types';
import { EntThreatDetectorNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntThreatDetectorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getThreatDetector(schoolId: string, id: string): Promise<ThreatDetector> {
    const item = await this.repo.findThreatDetectorById(schoolId, id);
    if (!item) throw new EntThreatDetectorNotFoundError(id);
    return item;
  }
  async listThreatDetectors(schoolId: string, filters?: Record<string, unknown>): Promise<ThreatDetector[]> {
    return this.repo.findAllThreatDetectors(schoolId, filters);
  }
  async createThreatDetector(schoolId: string, data: ThreatDetectorCreate): Promise<ThreatDetector> {
    return this.repo.createThreatDetector(schoolId, data);
  }
  async updateThreatDetector(schoolId: string, id: string, data: Partial<ThreatDetectorCreate>): Promise<ThreatDetector> {
    const existing = await this.repo.findThreatDetectorById(schoolId, id);
    if (!existing) throw new EntThreatDetectorNotFoundError(id);
    return this.repo.updateThreatDetector(schoolId, id, data);
  }
  async deleteThreatDetector(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findThreatDetectorById(schoolId, id);
    if (!existing) throw new EntThreatDetectorNotFoundError(id);
    return this.repo.deleteThreatDetector(schoolId, id);
  }
  async countThreatDetectors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countThreatDetectors(schoolId, filters);
  }
}
