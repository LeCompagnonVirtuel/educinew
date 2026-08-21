// Enterprise Platform Service - SDKRelease
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SDKRelease, SDKReleaseCreate } from '@educi/types';
import { EntSdkReleaseNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSdkReleaseService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSdkRelease(schoolId: string, id: string): Promise<SDKRelease> {
    const item = await this.repo.findSdkReleaseById(schoolId, id);
    if (!item) throw new EntSdkReleaseNotFoundError(id);
    return item;
  }
  async listSdkReleases(schoolId: string, filters?: Record<string, unknown>): Promise<SDKRelease[]> {
    return this.repo.findAllSdkReleases(schoolId, filters);
  }
  async createSdkRelease(schoolId: string, data: SDKReleaseCreate): Promise<SDKRelease> {
    return this.repo.createSdkRelease(schoolId, data);
  }
  async updateSdkRelease(schoolId: string, id: string, data: Partial<SDKReleaseCreate>): Promise<SDKRelease> {
    const existing = await this.repo.findSdkReleaseById(schoolId, id);
    if (!existing) throw new EntSdkReleaseNotFoundError(id);
    return this.repo.updateSdkRelease(schoolId, id, data);
  }
  async deleteSdkRelease(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSdkReleaseById(schoolId, id);
    if (!existing) throw new EntSdkReleaseNotFoundError(id);
    return this.repo.deleteSdkRelease(schoolId, id);
  }
  async countSdkReleases(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSdkReleases(schoolId, filters);
  }
}
