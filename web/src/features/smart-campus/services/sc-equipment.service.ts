import type { SupabaseClient } from '@supabase/supabase-js';
import type { Equipment, EquipmentCreate } from '@educi/types';
import { ScEquipmentNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEquipmentService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getEquipment(schoolId: string, id: string): Promise<Equipment> {
    const equipment = await this.repo.findEquipmentById(schoolId, id);
    if (!equipment) throw new ScEquipmentNotFoundError(id);
    return equipment;
  }

  async listEquipment(schoolId: string, filters?: Record<string, unknown>): Promise<Equipment[]> {
    return this.repo.findAllEquipment(schoolId, filters);
  }

  async createEquipment(schoolId: string, data: EquipmentCreate): Promise<Equipment> {
    return this.repo.createEquipment(schoolId, data);
  }

  async updateEquipment(schoolId: string, id: string, data: Partial<EquipmentCreate>): Promise<Equipment> {
    const existing = await this.repo.findEquipmentById(schoolId, id);
    if (!existing) throw new ScEquipmentNotFoundError(id);
    return this.repo.updateEquipment(schoolId, id, data);
  }

  async deleteEquipment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEquipmentById(schoolId, id);
    if (!existing) throw new ScEquipmentNotFoundError(id);
    return this.repo.deleteEquipment(schoolId, id);
  }

  async countEquipment(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEquipment(schoolId, filters);
  }
}
