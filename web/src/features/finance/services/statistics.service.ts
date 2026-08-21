import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class StatisticsService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async getFinanceStatistics(academicYearId?: string) {
    const statistics = await this.repository.getFinanceStatistics(this.schoolId, academicYearId);
    logger.info('Finance statistics retrieved', { schoolId: this.schoolId }, 'finance');
    return statistics;
  }

  async getRevenueByMonth(startDate: string, endDate: string) {
    const revenue = await this.repository.listRevenue(this.schoolId, { startDate, endDate });
    logger.info('Revenue by month retrieved', { schoolId: this.schoolId }, 'finance');
    return revenue;
  }

  async getExpensesByMonth(startDate: string, endDate: string) {
    const expenses = await this.repository.listExpenses(this.schoolId, { startDate, endDate });
    logger.info('Expenses by month retrieved', { schoolId: this.schoolId }, 'finance');
    return expenses;
  }
}
