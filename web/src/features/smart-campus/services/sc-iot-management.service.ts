import type { SupabaseClient } from '@supabase/supabase-js';
import type { IoTDevice, IoTDeviceCreate, IoTDeviceUpdate } from '@educi/types';
import { ScIoTDeviceNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScIoTManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getDevice(schoolId: string, id: string): Promise<IoTDevice> {
    const device = await this.repo.findIoTDeviceById(schoolId, id);
    if (!device) throw new ScIoTDeviceNotFoundError(id);
    return device;
  }

  async listDevices(schoolId: string): Promise<IoTDevice[]> {
    return this.repo.findAllIoTDevices(schoolId);
  }

  async createDevice(schoolId: string, data: IoTDeviceCreate): Promise<IoTDevice> {
    return this.repo.createIoTDevice(schoolId, data);
  }

  async updateDevice(schoolId: string, id: string, data: IoTDeviceUpdate): Promise<IoTDevice> {
    const existing = await this.repo.findIoTDeviceById(schoolId, id);
    if (!existing) throw new ScIoTDeviceNotFoundError(id);
    return this.repo.updateIoTDevice(schoolId, id, data);
  }

  async deleteDevice(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIoTDeviceById(schoolId, id);
    if (!existing) throw new ScIoTDeviceNotFoundError(id);
    return this.repo.deleteIoTDevice(schoolId, id);
  }

  async getOfflineDevices(schoolId: string): Promise<IoTDevice[]> {
    return this.repo.findOfflineIoTDevices(schoolId);
  }

  async updateDeviceStatus(schoolId: string, id: string, status: string): Promise<IoTDevice> {
    const existing = await this.repo.findIoTDeviceById(schoolId, id);
    if (!existing) throw new ScIoTDeviceNotFoundError(id);
    return this.repo.updateIoTDeviceStatus(schoolId, id, status);
  }

  async getDevicesByBuilding(schoolId: string, buildingId: string): Promise<IoTDevice[]> {
    return this.repo.findIoTDevicesByBuilding(schoolId, buildingId);
  }
}
