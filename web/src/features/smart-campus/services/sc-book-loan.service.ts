import type { SupabaseClient } from '@supabase/supabase-js';
import type { BookLoan, BookLoanCreate } from '@educi/types';
import { ScLoanNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBookLoanService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getLoan(schoolId: string, id: string): Promise<BookLoan> {
    const loan = await this.repo.findBookLoanById(schoolId, id);
    if (!loan) throw new ScLoanNotFoundError(id);
    return loan;
  }

  async listLoans(schoolId: string, filters?: Record<string, unknown>): Promise<BookLoan[]> {
    return this.repo.findAllBookLoans(schoolId, filters);
  }

  async createLoan(schoolId: string, data: BookLoanCreate): Promise<BookLoan> {
    return this.repo.createBookLoan(schoolId, data);
  }

  async updateLoan(schoolId: string, id: string, data: Partial<BookLoanCreate>): Promise<BookLoan> {
    const existing = await this.repo.findBookLoanById(schoolId, id);
    if (!existing) throw new ScLoanNotFoundError(id);
    return this.repo.updateBookLoan(schoolId, id, data);
  }

  async deleteLoan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBookLoanById(schoolId, id);
    if (!existing) throw new ScLoanNotFoundError(id);
    return this.repo.deleteBookLoan(schoolId, id);
  }

  async extendLoan(schoolId: string, id: string, newDueDate: string): Promise<BookLoan> {
    const existing = await this.repo.findBookLoanById(schoolId, id);
    if (!existing) throw new ScLoanNotFoundError(id);
    return this.repo.extendBookLoan(schoolId, id, newDueDate);
  }

  async findActiveLoans(schoolId: string): Promise<BookLoan[]> {
    return this.repo.findActiveBookLoans(schoolId);
  }

  async countLoans(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBookLoans(schoolId, filters);
  }
}
