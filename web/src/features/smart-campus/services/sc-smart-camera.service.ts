import type { SupabaseClient } from '@supabase/supabase-js';
import type { SmartCamera, SmartCameraCreate } from '@educi/types';
import { ScSmartCameraNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSmartCameraService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getCamera(schoolId: string, id: string): Promise<SmartCamera> {
    const camera = await this.repo.findSmartCameraById(schoolId, id);
    if (!camera) throw new ScSmartCameraNotFoundError(id);
    return camera;
  }

  async listCameras(schoolId: string, filters?: Record<string, unknown>): Promise<SmartCamera[]> {
    return this.repo.findAllSmartCameras(schoolId, filters);
  }

  async createCamera(schoolId: string, data: SmartCameraCreate): Promise<SmartCamera> {
    return this.repo.createSmartCamera(schoolId, data);
  }

  async updateCamera(schoolId: string, id: string, data: Partial<SmartCameraCreate>): Promise<SmartCamera> {
    const existing = await this.repo.findSmartCameraById(schoolId, id);
    if (!existing) throw new ScSmartCameraNotFoundError(id);
    return this.repo.updateSmartCamera(schoolId, id, data);
  }

  async deleteCamera(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSmartCameraById(schoolId, id);
    if (!existing) throw new ScSmartCameraNotFoundError(id);
    return this.repo.deleteSmartCamera(schoolId, id);
  }

  async countCameras(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSmartCameras(schoolId, filters);
  }
}
