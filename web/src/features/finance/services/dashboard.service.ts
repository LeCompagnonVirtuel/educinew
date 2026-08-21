import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class DashboardService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async getDashboard() {
    const dashboard = await this.repository.getFinanceDashboard(this.schoolId);
    logger.info('Finance dashboard retrieved', { schoolId: this.schoolId }, 'finance');
    return dashboard;
  }

  async getRecentPayments(limit = 10) {
    const payments = await this.repository.listPayments(this.schoolId);
    return payments.slice(0, limit);
  }

  async getRecentExpenses(limit = 10) {
    const expenses = await this.repository.listExpenses(this.schoolId);
    return expenses.slice(0, limit);
  }
}
