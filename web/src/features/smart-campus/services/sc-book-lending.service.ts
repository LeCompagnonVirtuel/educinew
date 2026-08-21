import type { SupabaseClient } from '@supabase/supabase-js';
import type { BookLoan, BookLoanCreate, BookReturn, BookReturnCreate } from '@educi/types';
import { ScBookLoanNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBookLendingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async createLoan(schoolId: string, data: BookLoanCreate): Promise<BookLoan> {
    return this.repo.createBookLoan(schoolId, data);
  }

  async getLoan(schoolId: string, id: string): Promise<BookLoan> {
    const loan = await this.repo.findBookLoanById(schoolId, id);
    if (!loan) throw new ScBookLoanNotFoundError(id);
    return loan;
  }

  async getActiveLoans(schoolId: string): Promise<BookLoan[]> {
    return this.repo.findActiveLoans(schoolId);
  }

  async getOverdueLoans(schoolId: string): Promise<BookLoan[]> {
    return this.repo.findOverdueLoans(schoolId);
  }

  async getLoansByStudent(schoolId: string, studentId: string): Promise<BookLoan[]> {
    return this.repo.findBookLoansByStudent(schoolId, studentId);
  }

  async extendLoan(schoolId: string, id: string, newDueDate: string): Promise<BookLoan> {
    const existing = await this.repo.findBookLoanById(schoolId, id);
    if (!existing) throw new ScBookLoanNotFoundError(id);
    return this.repo.extendBookLoan(schoolId, id, newDueDate);
  }

  async getMostBorrowed(schoolId: string, limit: number): Promise<{ bookId: string; count: number }[]> {
    return this.repo.findMostBorrowedBooks(schoolId, limit);
  }

  async processReturn(schoolId: string, data: BookReturnCreate): Promise<BookReturn> {
    return this.repo.createBookReturn(schoolId, data);
  }
}
