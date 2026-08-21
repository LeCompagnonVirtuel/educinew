import type { SupabaseClient } from '@supabase/supabase-js';
import type { GPSTracking, GPSLocation } from '@educi/types';
import { ScGpsTrackingNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusTrackingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getLatestPosition(schoolId: string, busId: string): Promise<GPSTracking> {
    return this.repo.getLatestBusPosition(schoolId, busId);
  }

  async updatePosition(schoolId: string, busId: string, latitude: number, longitude: number, speed: number): Promise<GPSTracking> {
    return this.repo.updateGpsPosition(schoolId, busId, latitude, longitude, speed);
  }

  async getBusHistory(schoolId: string, busId: string, from: string, to: string): Promise<GPSTracking[]> {
    return this.repo.trackBusHistory(schoolId, busId, from, to);
  }

  async getTripTracking(schoolId: string, tripId: string): Promise<GPSTracking[]> {
    return this.repo.findGpsTrackingByTrip(schoolId, tripId);
  }

  async getBusesInArea(schoolId: string, minLat: number, maxLat: number, minLng: number, maxLng: number): Promise<GPSTracking[]> {
    return this.repo.findBusesInArea(schoolId, minLat, maxLat, minLng, maxLng);
  }

  async getMaxSpeedRecord(schoolId: string, busId: string): Promise<GPSTracking> {
    return this.repo.findMaxSpeedRecord(schoolId, busId);
  }

  async getCount(schoolId: string): Promise<number> {
    return this.repo.countGpsTrackingRecords(schoolId);
  }

  async getTrackingByDate(schoolId: string, date: string): Promise<GPSTracking[]> {
    return this.repo.findGpsTrackingByDate(schoolId, date);
  }
}
