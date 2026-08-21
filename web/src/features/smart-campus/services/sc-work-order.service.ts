import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkOrder, WorkOrderCreate } from '@educi/types';
import { ScWorkOrderNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScWorkOrderService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getWorkOrder(schoolId: string, id: string): Promise<WorkOrder> {
    const workOrder = await this.repo.findWorkOrderById(schoolId, id);
    if (!workOrder) throw new ScWorkOrderNotFoundError(id);
    return workOrder;
  }

  async listWorkOrders(schoolId: string, filters?: Record<string, unknown>): Promise<WorkOrder[]> {
    return this.repo.findAllWorkOrders(schoolId, filters);
  }

  async createWorkOrder(schoolId: string, data: WorkOrderCreate): Promise<WorkOrder> {
    return this.repo.createWorkOrder(schoolId, data);
  }

  async updateWorkOrder(schoolId: string, id: string, data: Partial<WorkOrderCreate>): Promise<WorkOrder> {
    const existing = await this.repo.findWorkOrderById(schoolId, id);
    if (!existing) throw new ScWorkOrderNotFoundError(id);
    return this.repo.updateWorkOrder(schoolId, id, data);
  }

  async deleteWorkOrder(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWorkOrderById(schoolId, id);
    if (!existing) throw new ScWorkOrderNotFoundError(id);
    return this.repo.deleteWorkOrder(schoolId, id);
  }

  async countWorkOrders(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWorkOrders(schoolId, filters);
  }
}
