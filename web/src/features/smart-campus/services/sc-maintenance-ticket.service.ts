import type { SupabaseClient } from '@supabase/supabase-js';
import type { MaintenanceTicket, MaintenanceTicketCreate, MaintenanceTicketUpdate } from '@educi/types';
import { ScMaintenanceTicketNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMaintenanceTicketService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getTicket(schoolId: string, id: string): Promise<MaintenanceTicket> {
    const ticket = await this.repo.findMaintenanceTicketById(schoolId, id);
    if (!ticket) throw new ScMaintenanceTicketNotFoundError(id);
    return ticket;
  }

  async listTickets(schoolId: string, filters?: Record<string, unknown>): Promise<MaintenanceTicket[]> {
    return this.repo.findAllMaintenanceTickets(schoolId, filters);
  }

  async createTicket(schoolId: string, data: MaintenanceTicketCreate): Promise<MaintenanceTicket> {
    return this.repo.createMaintenanceTicket(schoolId, data);
  }

  async updateTicket(schoolId: string, id: string, data: MaintenanceTicketUpdate): Promise<MaintenanceTicket> {
    const existing = await this.repo.findMaintenanceTicketById(schoolId, id);
    if (!existing) throw new ScMaintenanceTicketNotFoundError(id);
    return this.repo.updateMaintenanceTicket(schoolId, id, data);
  }

  async deleteTicket(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMaintenanceTicketById(schoolId, id);
    if (!existing) throw new ScMaintenanceTicketNotFoundError(id);
    return this.repo.deleteMaintenanceTicket(schoolId, id);
  }

  async assignTechnician(schoolId: string, id: string, technicianId: string): Promise<MaintenanceTicket> {
    const existing = await this.repo.findMaintenanceTicketById(schoolId, id);
    if (!existing) throw new ScMaintenanceTicketNotFoundError(id);
    return this.repo.assignMaintenanceTicketTechnician(schoolId, id, technicianId);
  }

  async resolveTicket(schoolId: string, id: string, resolution: string): Promise<MaintenanceTicket> {
    const existing = await this.repo.findMaintenanceTicketById(schoolId, id);
    if (!existing) throw new ScMaintenanceTicketNotFoundError(id);
    return this.repo.resolveMaintenanceTicket(schoolId, id, resolution);
  }

  async countTickets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMaintenanceTickets(schoolId, filters);
  }
}
