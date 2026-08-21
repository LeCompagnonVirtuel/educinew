import type { SupabaseClient } from '@supabase/supabase-js';
import type { MaintenanceTicket, MaintenanceTicketCreate, MaintenanceTicketUpdate, WorkOrder, WorkOrderCreate } from '@educi/types';
import { ScMaintenanceTicketNotFoundError, ScWorkOrderNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMaintenanceSchedulingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async createTicket(schoolId: string, data: MaintenanceTicketCreate): Promise<MaintenanceTicket> {
    return this.repo.createMaintenanceTicket(schoolId, data);
  }

  async getTicket(schoolId: string, id: string): Promise<MaintenanceTicket> {
    const ticket = await this.repo.findMaintenanceTicketById(schoolId, id);
    if (!ticket) throw new ScMaintenanceTicketNotFoundError(id);
    return ticket;
  }

  async assignTechnician(schoolId: string, id: string, technicianId: string): Promise<MaintenanceTicket> {
    const existing = await this.repo.findMaintenanceTicketById(schoolId, id);
    if (!existing) throw new ScMaintenanceTicketNotFoundError(id);
    return this.repo.assignTechnicianToTicket(schoolId, id, technicianId);
  }

  async resolveTicket(schoolId: string, id: string, resolution: string): Promise<MaintenanceTicket> {
    const existing = await this.repo.findMaintenanceTicketById(schoolId, id);
    if (!existing) throw new ScMaintenanceTicketNotFoundError(id);
    return this.repo.resolveMaintenanceTicket(schoolId, id, resolution);
  }

  async getOpenTickets(schoolId: string): Promise<MaintenanceTicket[]> {
    return this.repo.findOpenMaintenanceTickets(schoolId);
  }

  async getOverdueTickets(schoolId: string): Promise<MaintenanceTicket[]> {
    return this.repo.findOverdueMaintenanceTickets(schoolId);
  }

  async createWorkOrder(schoolId: string, data: WorkOrderCreate): Promise<WorkOrder> {
    return this.repo.createWorkOrder(schoolId, data);
  }

  async completeWorkOrder(schoolId: string, id: string, notes: string): Promise<WorkOrder> {
    const existing = await this.repo.findWorkOrderById(schoolId, id);
    if (!existing) throw new ScWorkOrderNotFoundError(id);
    return this.repo.completeWorkOrder(schoolId, id, notes);
  }
}
