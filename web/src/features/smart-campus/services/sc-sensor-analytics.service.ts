import type { SupabaseClient } from '@supabase/supabase-js';
import type { Sensor, SensorCreate } from '@educi/types';
import { ScSensorNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSensorAnalyticsService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getSensor(schoolId: string, id: string): Promise<Sensor> {
    const sensor = await this.repo.findSensorById(schoolId, id);
    if (!sensor) throw new ScSensorNotFoundError(id);
    return sensor;
  }

  async listSensors(schoolId: string): Promise<Sensor[]> {
    return this.repo.findAllSensors(schoolId);
  }

  async createSensor(schoolId: string, data: SensorCreate): Promise<Sensor> {
    return this.repo.createSensor(schoolId, data);
  }

  async getSensorsByType(schoolId: string, type: string): Promise<Sensor[]> {
    return this.repo.findSensorsByType(schoolId, type);
  }

  async getOutOfRangeSensors(schoolId: string, minValue: number, maxValue: number): Promise<Sensor[]> {
    return this.repo.findSensorsOutOfRange(schoolId, minValue, maxValue);
  }

  async getCalibrationDue(schoolId: string): Promise<Sensor[]> {
    return this.repo.findSensorsCalibrationDue(schoolId);
  }

  async getMalfunctioning(schoolId: string): Promise<Sensor[]> {
    return this.repo.findMalfunctioningSensors(schoolId);
  }

  async deleteSensor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSensorById(schoolId, id);
    if (!existing) throw new ScSensorNotFoundError(id);
    return this.repo.deleteSensor(schoolId, id);
  }
}
