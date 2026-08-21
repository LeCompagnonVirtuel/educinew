import type { SupabaseClient } from '@supabase/supabase-js';
import type { Sensor, SensorCreate } from '@educi/types';
import { ScSensorNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSensorService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getSensor(schoolId: string, id: string): Promise<Sensor> {
    const sensor = await this.repo.findSensorById(schoolId, id);
    if (!sensor) throw new ScSensorNotFoundError(id);
    return sensor;
  }

  async listSensors(schoolId: string, filters?: Record<string, unknown>): Promise<Sensor[]> {
    return this.repo.findAllSensors(schoolId, filters);
  }

  async createSensor(schoolId: string, data: SensorCreate): Promise<Sensor> {
    return this.repo.createSensor(schoolId, data);
  }

  async updateSensor(schoolId: string, id: string, data: Partial<SensorCreate>): Promise<Sensor> {
    const existing = await this.repo.findSensorById(schoolId, id);
    if (!existing) throw new ScSensorNotFoundError(id);
    return this.repo.updateSensor(schoolId, id, data);
  }

  async deleteSensor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSensorById(schoolId, id);
    if (!existing) throw new ScSensorNotFoundError(id);
    return this.repo.deleteSensor(schoolId, id);
  }

  async countSensors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSensors(schoolId, filters);
  }
}
