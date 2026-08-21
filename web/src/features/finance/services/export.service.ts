import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class ExportService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async exportInvoices(filters?: Record<string, unknown>) {
    const data = await this.repository.exportInvoices(this.schoolId, filters);
    logger.info('Invoices exported', { count: data.length }, 'finance');
    return data;
  }

  async exportPayments(filters?: Record<string, unknown>) {
    const data = await this.repository.exportPayments(this.schoolId, filters);
    logger.info('Payments exported', { count: data.length }, 'finance');
    return data;
  }

  async exportExpenses(filters?: Record<string, unknown>) {
    const data = await this.repository.exportExpenses(this.schoolId, filters);
    logger.info('Expenses exported', { count: data.length }, 'finance');
    return data;
  }

  async exportReport(type: string, startDate: string, endDate: string) {
    let data: any;
    switch (type) {
      case 'income_statement':
        data = await this.repository.generateIncomeStatement(this.schoolId, startDate, endDate);
        break;
      case 'balance_sheet':
        data = await this.repository.generateBalanceSheet(this.schoolId);
        break;
      case 'cash_flow':
        data = await this.repository.generateCashFlow(this.schoolId, startDate, endDate);
        break;
      default:
        data = await this.repository.listReports(this.schoolId, type);
    }
    logger.info('Report exported', { type }, 'finance');
    return data;
  }
}
