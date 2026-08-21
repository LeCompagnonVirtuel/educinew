import type { SupabaseClient } from '@supabase/supabase-js';
import type { VisitorRegistration, VisitorRegistrationCreate, VisitorApproval, VisitorApprovalCreate } from '@educi/types';
import { ScVisitorRegistrationNotFoundError, ScVisitorApprovalNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVisitorManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async registerVisitor(schoolId: string, data: VisitorRegistrationCreate): Promise<VisitorRegistration> {
    return this.repo.createVisitorRegistration(schoolId, data);
  }

  async getRegistration(schoolId: string, id: string): Promise<VisitorRegistration> {
    const registration = await this.repo.findVisitorRegistrationById(schoolId, id);
    if (!registration) throw new ScVisitorRegistrationNotFoundError(id);
    return registration;
  }

  async checkIn(schoolId: string, id: string): Promise<VisitorRegistration> {
    const existing = await this.repo.findVisitorRegistrationById(schoolId, id);
    if (!existing) throw new ScVisitorRegistrationNotFoundError(id);
    return this.repo.checkInVisitor(schoolId, id);
  }

  async checkOut(schoolId: string, id: string): Promise<VisitorRegistration> {
    const existing = await this.repo.findVisitorRegistrationById(schoolId, id);
    if (!existing) throw new ScVisitorRegistrationNotFoundError(id);
    return this.repo.checkOutVisitor(schoolId, id);
  }

  async getCheckedInVisitors(schoolId: string): Promise<VisitorRegistration[]> {
    return this.repo.findCheckedInVisitors(schoolId);
  }

  async createApproval(schoolId: string, data: VisitorApprovalCreate): Promise<VisitorApproval> {
    return this.repo.createVisitorApproval(schoolId, data);
  }

  async approveVisitor(schoolId: string, id: string, approverId: string, notes: string): Promise<VisitorApproval> {
    const existing = await this.repo.findVisitorApprovalById(schoolId, id);
    if (!existing) throw new ScVisitorApprovalNotFoundError(id);
    return this.repo.approveVisitor(schoolId, id, approverId, notes);
  }

  async getPendingApprovals(schoolId: string): Promise<VisitorApproval[]> {
    return this.repo.findPendingVisitorApprovals(schoolId);
  }
}
