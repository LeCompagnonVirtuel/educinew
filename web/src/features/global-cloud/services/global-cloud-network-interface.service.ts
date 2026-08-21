import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkInterface } from '@educi/types';
import { EduCloudNetworkInterfaceError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudNetworkInterface {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getNetworkInterface(schoolId: string, id: string): Promise<NetworkInterface> {
    const item = await this.repo.getNetworkInterface(schoolId, id);
    if (!item) throw new EduCloudNetworkInterfaceError(id);
    return item;
  }
  async listNetworkInterfaces(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkInterface[]> {
    return this.repo.listNetworkInterface(schoolId, filters);
  }
  async createNetworkInterface(schoolId: string, data: Partial<NetworkInterface>): Promise<NetworkInterface> {
    return this.repo.createNetworkInterface(schoolId, data as any);
  }
  async updateNetworkInterface(schoolId: string, id: string, data: Partial<NetworkInterface>): Promise<NetworkInterface> {
    const existing = await this.repo.getNetworkInterface(schoolId, id);
    if (!existing) throw new EduCloudNetworkInterfaceError(id);
    return this.repo.updateNetworkInterface(schoolId, id, data as any);
  }
  async deleteNetworkInterface(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNetworkInterface(schoolId, id);
    if (!existing) throw new EduCloudNetworkInterfaceError(id);
    return this.repo.deleteNetworkInterface(schoolId, id);
  }
}
