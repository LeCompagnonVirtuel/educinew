import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class SearchService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async searchInvoices(query: string) {
    const results = await this.repository.searchInvoices(this.schoolId, query);
    logger.info('Invoice search completed', { query, count: results.length }, 'finance');
    return results;
  }

  async searchPayments(query: string) {
    const payments = await this.repository.listPayments(this.schoolId);
    const filtered = payments.filter(
      (p) =>
        (p.reference_number && p.reference_number.toLowerCase().includes(query.toLowerCase())) ||
        (p.student_name && p.student_name.toLowerCase().includes(query.toLowerCase())),
    );
    logger.info('Payment search completed', { query, count: filtered.length }, 'finance');
    return filtered;
  }

  async searchExpenses(query: string) {
    const expenses = await this.repository.listExpenses(this.schoolId);
    const filtered = expenses.filter(
      (e) =>
        (e.description && e.description.toLowerCase().includes(query.toLowerCase())) ||
        (e.category && e.category.toLowerCase().includes(query.toLowerCase())),
    );
    logger.info('Expense search completed', { query, count: filtered.length }, 'finance');
    return filtered;
  }
}
