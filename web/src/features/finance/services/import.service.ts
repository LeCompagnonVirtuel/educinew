import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class ImportService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async importInvoices(data: Record<string, unknown>[]) {
    const results = [];
    for (const invoiceData of data) {
      const invoice = await this.repository.createInvoice({ ...invoiceData, school_id: this.schoolId });
      results.push(invoice);
    }
    logger.info('Invoices imported', { count: results.length }, 'finance');
    return results;
  }

  async importExpenses(data: Record<string, unknown>[]) {
    const results = [];
    for (const expenseData of data) {
      const expense = await this.repository.createExpense({ ...expenseData, school_id: this.schoolId });
      results.push(expense);
    }
    logger.info('Expenses imported', { count: results.length }, 'finance');
    return results;
  }
}
