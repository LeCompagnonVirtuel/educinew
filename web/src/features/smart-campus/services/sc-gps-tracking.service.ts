import type { SupabaseClient } from '@supabase/supabase-js';
import type { GPSTracking, GPSLocation } from '@educi/types';
import { ScTrackingNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScGPSTrackingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getTracking(schoolId: string, id: string): Promise<GPSTracking> {
    const tracking = await this.repo.findGPSTrackingById(schoolId, id);
    if (!tracking) throw new ScTrackingNotFoundError(id);
    return tracking;
  }

  async listTrackings(schoolId: string, filters?: Record<string, unknown>): Promise<GPSTracking[]> {
    return this.repo.findAllGPSTrackings(schoolId, filters);
  }

  async createTracking(schoolId: string, data: GPSLocation): Promise<GPSTracking> {
    return this.repo.createGPSTracking(schoolId, data);
  }

  async deleteTracking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGPSTrackingById(schoolId, id);
    if (!existing) throw new ScTrackingNotFoundError(id);
    return this.repo.deleteGPSTracking(schoolId, id);
  }

  async findLatestByBusId(schoolId: string, busId: string): Promise<GPSTracking | null> {
    return this.repo.findLatestGPSTrackingByBusId(schoolId, busId);
  }

  async findByBusId(schoolId: string, busId: string): Promise<GPSTracking[]> {
    return this.repo.findGPSTrackingsByBusId(schoolId, busId);
  }
}
